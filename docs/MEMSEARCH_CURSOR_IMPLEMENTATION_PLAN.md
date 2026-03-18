# Cursor 用 MEMSearch 統合 詳細実装計画

> **注意**: 本ドキュメントは Plan mode で作成。ファイル編集・コマンド実行は行っていない。
> CreatePlan 相当の成果物として、タスク分割・サブエージェント割当・技術仕様を記載。

---

## 1. 概要

| 項目 | 内容 |
|------|------|
| **目的** | Cursor チャットで MEMSearch と同等の機能（会話記録・自動参照）を実現 |
| **制約** | `.memsearch/` および Claude Code プラグインには一切触れない完全独立実装 |
| **メモリ保存先** | `.cursor-memsearch/memory/` |
| **フック配置** | `.cursor/hooks/` + `.cursor/hooks.json` |

---

## 2. タスク一覧とサブエージェント割当

### Phase 0: 事前準備・検証（順次実行）

| ID | タスク | サブエージェント | 依存 | 備考 |
|----|--------|------------------|------|------|
| T0-1 | Cursor で transcript_path が有効か確認（設定・環境変数 CURSOR_TRANSCRIPT_PATH） | **generalPurpose** | - | 調査のみ。設定ガイドを確認 |
| T0-2 | memsearch の既存インストール確認（`memsearch --version` 等） | **shell** | - | 追加インストール不要の前提検証 |
| T0-3 | memsearch の collection 分離方法の検証（.cursor-memsearch.toml 等） | **generalPurpose** | T0-2 | MEM.md の milvus.collection を参照 |

### Phase 1: ディレクトリ・設定基盤（並列可能: T1-1 と T1-2）

| ID | タスク | サブエージェント | 依存 | 備考 |
|----|--------|------------------|------|------|
| T1-1 | `.cursor-memsearch/memory/` ディレクトリ作成用のセットアップスクリプト | **shell** | - | mkdir -p 等。初回のみ |
| T1-2 | `.cursor-memsearch.toml` 作成（collection 名・milvus.uri を Cursor 用に分離） | **generalPurpose** | T0-3 | MEM.md の設定例を参照 |
| T1-3 | `.cursor/hooks/` ディレクトリ作成と `hooks.json` の雛形配置 | **shell** | - | 既存があればマージ方針を検討 |

### Phase 2: 共通モジュール・パーサー（順次実行）

| ID | タスク | サブエージェント | 依存 | 備考 |
|----|--------|------------------|------|------|
| T2-1 | Cursor 用トランスクリプトパーサー（JSONL → 要約用テキスト）の仕様策定 | **generalPurpose** | T0-1 | 仕様のみ。実装は T2-2 |
| T2-2 | パーサー実装（Bash/jq または Python） | **generalPurpose** | T2-1 | `.cursor/hooks/lib/parse-cursor-transcript.sh` 等 |
| T2-3 | workspace_roots からプロジェクトルート取得ロジックの実装 | **generalPurpose** | - | `workspace_roots[0]` を優先、フォールバックは CURSOR_PROJECT_DIR |

### Phase 3: フックスクリプト実装（stop が最重要、他は並列可能）

| ID | タスク | サブエージェント | 依存 | 備考 |
|----|--------|------------------|------|------|
| T3-1 | `common-cursor-memsearch.sh` 作成（MEMSEARCH_DIR, MEMORY_DIR, memsearch 検出） | **shell** | T1-1, T1-2 | Cursor 用の common.sh |
| T3-2 | `stop.sh` 実装（transcript_path → パース → 要約 → 追記 → index） | **generalPurpose** | T2-2, T2-3, T3-1 | 中核処理 |
| T3-3 | `session-start.sh` 実装（watch 起動、直近メモリを additional_context で返却） | **generalPurpose** | T3-1 | sessionStart の出力形式に準拠 |
| T3-4 | `before-submit-prompt.sh` 実装（`[memsearch] Memory available` ヒント） | **shell** | T3-1 | 軽量。beforeSubmitPrompt 用 |
| T3-5 | `session-end.sh` 実装（watch プロセス停止） | **shell** | T3-1 | .cursor-memsearch/.watch.pid 等で PID 管理 |

### Phase 4: 統合・検証（順次実行）

| ID | タスク | サブエージェント | 依存 | 備考 |
|----|--------|------------------|------|------|
| T4-1 | `hooks.json` に 4 フックを登録（sessionStart, beforeSubmitPrompt, stop, sessionEnd） | **generalPurpose** | T3-2〜T3-5 | パスは `.cursor/hooks/xxx.sh` |
| T4-2 | 手動テスト: サンプルメモリ作成 → index → search が動作するか | **shell** | T1-2, T3-1 | memsearch 単体の動作確認 |
| T4-3 | Cursor 上でフック実行確認（Hooks 出力チャンネルでログ確認） | **generalPurpose** | T4-1 | ユーザー操作が必要 |
| T4-4 | エラーハンドリング・ログ出力の整備（transcript_path が null のとき等） | **fixer** | T3-2, T3-3 | 失敗時も安全に終了 |

### Phase 5: ドキュメント・スキル（並列可能）

| ID | タスク | サブエージェント | 依存 | 備考 |
|----|--------|------------------|------|------|
| T5-1 | memory-recall スキルの Cursor 用パス修正（.cursor-memsearch を参照） | **generalPurpose** | T1-2 | 既存スキルの MEMORY_DIR 参照を変更 |
| T5-2 | `docs/MEMSEARCH_CURSOR_INTEGRATION.md` に実装完了内容を反映 | **doc** | T4-4 | 次のステップ・トラブルシュートを追記 |

---

## 3. サブエージェント呼び出し方針

### 並列実行可能なタスク

- **Phase 1**: T1-1 と T1-2 は並列可能（T1-3 は T1-1 と独立して並列可）
- **Phase 3**: T3-1 完了後、T3-3, T3-4, T3-5 は並列可能（T3-2 は T3-1 に依存）
- **Phase 5**: T5-1 と T5-2 は並列可能

### 順次実行が必要なタスク

- **Phase 0**: T0-1 → T0-2 → T0-3（調査の連鎖）
- **Phase 2**: T2-1 → T2-2（仕様 → 実装）
- **Phase 3**: T3-1 → T3-2（common が stop の前提）
- **Phase 4**: T4-1 → T4-2 → T4-3 → T4-4（統合後に検証・修正）

### 推奨実行順序（高レベル）

```
Phase 0 (調査) → Phase 1 (基盤) → Phase 2 (パーサー) → Phase 3 (フック) → Phase 4 (統合) → Phase 5 (ドキュメント)
```

---

## 4. 技術的な詳細

### 4.1 Cursor 用トランスクリプトパーサー仕様

**入力形式（Cursor agent-transcripts JSONL）:**

```json
{"role":"user","message":{"content":[{"type":"text","text":"<user_query>\nユーザーの質問..."}]}}
{"role":"assistant","message":{"content":[{"type":"text","text":"アシスタントの回答..."}]}}
```

**パーサーの責務:**

1. JSONL を 1 行ずつパース
2. `role` が `user` の行: `message.content[].text` を連結（`<user_query>` は除去またはそのまま）
3. `role` が `assistant` の行: 同様に `message.content[].text` を連結
4. **最終ターンのみ**抽出: 最後の user + assistant ペア
5. 要約用テキストとして出力: `User: ...\nAssistant: ...` 形式

**実装の選択肢:**

- **Bash + jq**: 軽量、依存少。`jq -c` で行パース、`jq -r '.message.content[].text'` でテキスト抽出
- **Python**: 複雑なロジックなら可読性が高い。`json` 標準ライブラリで十分

**エッジケース:**

- `content` が複数要素（`type: "text"` 以外）: `type: "text"` のみ抽出
- 空のトランスクリプト: 要約をスキップして exit 0

---

### 4.2 memsearch の collection を Cursor 用に分離する方法

**方針: プロジェクトルートに `.cursor-memsearch.toml` を配置**

MEM.md の設定優先順位より、プロジェクト内の `.memsearch.toml` が読み込まれる。Cursor 用は別ファイルとして扱うため、以下のいずれかを使用:

**オプション A: 環境変数で config 指定（memsearch が対応する場合）**

```bash
MEMSEARCH_CONFIG=.cursor-memsearch.toml memsearch index .cursor-memsearch/memory/
```

**オプション B: 専用ディレクトリで実行**

```bash
cd .cursor-memsearch
# このディレクトリに .memsearch.toml を配置し、collection を cursor_memsearch_chunks に
memsearch index ./memory/
```

**オプション C: milvus.uri と collection の分離**

`.cursor-memsearch.toml` の例:

```toml
[embedding]
provider = "onnx"                    # 既存 memsearch と同じ設定を継承可能

[milvus]
uri = "~/.memsearch/cursor-milvus.db"   # Claude 用と別 DB
collection = "cursor_memsearch_chunks"  # 別 collection 名
```

**フック内での実行:**

- `MEMSEARCH_DIR` を `.cursor-memsearch` に設定
- `memsearch index .cursor-memsearch/memory/` 実行時に、カレントディレクトリがプロジェクトルートなら `.cursor-memsearch.toml` を探す
- memsearch の config 探索ロジック: カレントディレクトリの `.memsearch.toml` を優先する可能性があるため、**オプション B** が確実（`.cursor-memsearch/` 内に `.memsearch.toml` を置き、`cd` してから実行）

---

### 4.3 workspace_roots からプロジェクトルートを取得するロジック

**Cursor フック共通入力（Hooks Reference より）:**

```json
{
  "workspace_roots": ["/path/to/project"],
  "transcript_path": "/path/to/transcript.jsonl"
}
```

**環境変数:**

- `CURSOR_PROJECT_DIR`: ワークスペースルート（常に存在）
- `CURSOR_TRANSCRIPT_PATH`: トランスクリプトファイルパス（transcript 有効時）

**ロジック:**

```bash
# 優先順位: 1) JSON の workspace_roots[0], 2) CURSOR_PROJECT_DIR, 3) カレントディレクトリ
PROJECT_ROOT="${workspace_roots[0]:-$CURSOR_PROJECT_DIR}"
PROJECT_ROOT="${PROJECT_ROOT:-$(pwd)}"
```

**マルチルートの扱い:**

- 現状は `workspace_roots[0]` をプロジェクトルートとして使用
- 追加の検討: 複数ルートの場合は `.cursor-memsearch` が存在するルートを優先

---

### 4.4 フック入出力仕様（抜粋）

| フック | 入力（追加） | 出力 |
|--------|--------------|------|
| **sessionStart** | session_id, is_background_agent, composer_mode | additional_context |
| **stop** | status, loop_count + 共通入力（transcript_path 含む） | followup_message（オプション） |
| **beforeSubmitPrompt** | prompt, attachments | continue, user_message |
| **sessionEnd** | session_id, reason, duration_ms, ... | なし（fire-and-forget） |

**共通入力（全フック）:**

- conversation_id, generation_id, model, hook_event_name, cursor_version
- workspace_roots, user_email, transcript_path

---

### 4.5 メモリファイルのフォーマット（既存 .memsearch との互換）

既存の `.memsearch/memory/YYYY-MM-DD.md` 形式を踏襲:

```markdown
### HH:MM
<!-- session:<session_id> turn:<turn_id> transcript:<path> -->
- 要約1
- 要約2
```

**session_id / turn_id:**

- Cursor の `conversation_id` を session に、`generation_id` を turn に使用可能
- トランスクリプトパスは `transcript_path` をそのまま記載

---

## 5. リスク・注意点

| 項目 | 内容 |
|------|------|
| transcript_path が null | 設定で無効になっている場合あり。stop.sh で null チェック必須 |
| watch プロセスの重複 | sessionStart で既に起動済みかチェック（.watch.pid の存在確認） |
| 要約失敗時の扱い | 失敗しても exit 0 で終了し、エージェント動作をブロックしない |
| ANTHROPIC_API_KEY | stop.sh の要約に Haiku を使用する場合、環境変数が必要 |

---

## 6. 成果物チェックリスト

- [ ] `.cursor/hooks.json` に 4 フック登録
- [ ] `.cursor/hooks/session-start.sh`
- [ ] `.cursor/hooks/before-submit-prompt.sh`
- [ ] `.cursor/hooks/stop.sh`
- [ ] `.cursor/hooks/session-end.sh`
- [ ] `.cursor/hooks/lib/parse-cursor-transcript.sh`（または同機能）
- [ ] `.cursor/hooks/common-cursor-memsearch.sh`
- [ ] `.cursor-memsearch.toml`（または .cursor-memsearch/.memsearch.toml）
- [ ] `.cursor-memsearch/memory/` ディレクトリ
- [ ] memory-recall スキルの Cursor 用パス対応
- [ ] docs/MEMSEARCH_CURSOR_INTEGRATION.md 更新

---

## 7. 参考

- [docs/MEMSEARCH_CURSOR_INTEGRATION.md](./MEMSEARCH_CURSOR_INTEGRATION.md)
- [MEM.md](../MEM.md)
- [Cursor Hooks Reference](https://cursor.com/docs/agent/hooks)
- [Cursor Third Party Hooks](https://cursor.com/docs/reference/third-party-hooks)
