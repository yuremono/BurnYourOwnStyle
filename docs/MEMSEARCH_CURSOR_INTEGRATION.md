# MEMSearch を Cursor チャットで使う方法

## 調査結果サマリ

**結論: 同じような機能を Cursor で実現できます。**

Cursor は Claude Code の Third Party Hooks をサポートしており、MEMSearch プラグインのフックを Cursor 用に書き換えれば、ほぼ同等の動作が可能です。

---

## 1. アーキテクチャ比較

### MEMSearch（Claude Code）の構成

| 要素 | 役割 |
|------|------|
| **SessionStart** | watch 開始、直近メモリをコンテキストに注入 |
| **UserPromptSubmit** | `[memsearch] Memory available` ヒント表示 |
| **Stop** | トランスクリプトを要約し `.memsearch/memory/YYYY-MM-DD.md` に追記 |
| **SessionEnd** | watch プロセス停止 |
| **memory-recall スキル** | ベクトル検索で過去の会話を取得（サブエージェントで実行） |

### Cursor との対応関係

| Claude Code | Cursor | 対応 |
|-------------|--------|------|
| SessionStart | `sessionStart` | ✅ マッピング済み |
| UserPromptSubmit | `beforeSubmitPrompt` | ✅ マッピング済み |
| Stop | `stop` | ✅ マッピング済み |
| SessionEnd | `sessionEnd` | ✅ マッピング済み |

Cursor のフック入力には **`transcript_path`** が含まれるため、Stop フックでトランスクリプトを読み取り、要約してメモリに追記できます。

---

## 2. 必要な作業

### 2.1 Third Party Skills の有効化

1. Cursor Settings → Features → **Third-party skills** を ON
2. `.claude/settings.json` または `.cursor/hooks.json` でフックを設定

### 2.2 memsearch のインストール

```bash
# ONNX（APIキー不要、ローカル実行）
pip install "memsearch[onnx]"

# または uvx で実行
uvx --from 'memsearch[onnx]' memsearch search "warmup" 2>/dev/null || true
```

### 2.3 ディレクトリ構成

```
PROJECT_ROOT/
├── .memsearch/
│   ├── memory/
│   │   ├── 2026-03-18.md   # 日付ごとのチャット履歴
│   │   ├── 2026-03-17.md
│   │   └── ...
│   └── .watch.pid
├── .cursor/
│   └── hooks/
│       ├── session-start.sh
│       ├── before-submit-prompt.sh
│       ├── stop.sh
│       └── session-end.sh
└── hooks.json  # または .cursor/hooks.json
```

### 2.4 トランスクリプト形式の違い

**Cursor の agent-transcripts 形式（JSONL）:**

```json
{"role":"user","message":{"content":[{"type":"text","text":"<user_query>\nユーザーの質問..."}]}}
{"role":"assistant","message":{"content":[{"type":"text","text":"アシスタントの回答..."}]}}
```

MEMSearch の `parse-transcript.sh` は Claude Code の JSONL 形式を前提にしているため、**Cursor 用のパーサー**を用意する必要があります。

---

## 3. 実装案

### 3.1 Cursor 用 hooks.json

```json
{
  "version": 1,
  "hooks": {
    "sessionStart": [{ "command": ".cursor/hooks/session-start.sh" }],
    "beforeSubmitPrompt": [{ "command": ".cursor/hooks/before-submit-prompt.sh" }],
    "stop": [{ "command": ".cursor/hooks/stop.sh" }],
    "sessionEnd": [{ "command": ".cursor/hooks/session-end.sh" }]
  }
}
```

### 3.2 stop.sh の処理フロー（Cursor 用）

1. フック入力から `transcript_path` を取得
2. `workspace_roots[0]` をプロジェクトルートとして使用
3. トランスクリプト JSONL をパース（Cursor 形式対応）
4. 最終ターン（最後のユーザー質問＋アシスタント応答）を抽出
5. `claude -p --model haiku` または API で要約
6. `.memsearch/memory/$(date +%Y-%m-%d).md` に追記
7. `memsearch index .memsearch/memory/` でインデックス更新（または watch に任せる）

### 3.3 memory-recall スキル

すでに `memory-recall` スキルが登録されています。このスキルは次のように動作します：

- ユーザーの質問が過去の会話に関連しそうなときに発動
- `memsearch search "<query>" --top-k 7` でベクトル検索
- 検索結果を要約してコンテキストに注入

**前提条件:** `memsearch` CLI が PATH にあり、`.memsearch/memory/` がインデックス済みであること。

---

## 4. 制約・注意点

| 項目 | 内容 |
|------|------|
| **transcript_path** | トランスクリプトが無効な場合は `null`。設定で有効化が必要な場合あり |
| **watch プロセス** | sessionStart で `memsearch watch .memsearch/memory/` を起動し、sessionEnd で停止 |
| **要約モデル** | stop.sh で Haiku を使用。`ANTHROPIC_API_KEY` が必要 |
| **プロジェクトルート** | `workspace_roots[0]` を使用。マルチルートの場合は要検討 |

---

## 5. 代替案: MCP サーバー

フックではなく、**MCP サーバー**でメモリ検索・記録を提供する方法もあります。

- **メリット:** エージェントが明示的に `mem_search` や `mem_save` ツールを呼べる
- **デメリット:** 自動記録には別途フックが必要。ツール定義がコンテキストを消費

MEMSearch の設計思想（Markdown をソース、自動キャプチャ）に合わせるなら、**フック＋スキル**の構成が適しています。

---

## 6. 次のステップ

1. **Cursor で transcript_path が有効か確認**  
   設定でトランスクリプト保存が有効になっているか確認する。

2. **最小構成で試す**  
   - `memsearch` をインストール  
   - `.memsearch/memory/` を手動で作成し、サンプル .md を置く  
   - `memsearch index .memsearch/memory/` でインデックス  
   - `memsearch search "テスト"` で検索が動くか確認  

3. **stop.sh の Cursor 対応**  
   - Cursor の JSONL 形式をパースするスクリプトを実装  
   - transcript_path が null でないことを確認してから要約処理を実行  

4. **memory-recall スキルの動作確認**  
   - 「先週の会話で〇〇について話した内容を思い出して」のような質問で、スキルが発動し検索されるか確認する。

---

## 参考リンク

- [MEMSearch Claude Plugin](https://zilliztech.github.io/memsearch/claude-plugin/)
- [Cursor Third Party Hooks](https://cursor.com/docs/reference/third-party-hooks)
- [Cursor Hooks Reference](https://cursor.com/docs/agent/hooks)
- プロジェクト内: `MEM.md`（memsearch のカスタマイズポイント）
