いい設計です。
CursorはClaude Codeと違って「フック」ではなく
**MCP（Model Context Protocol）経由で“エージェントにツールを使わせる設計”**になります。

つまり本質は：

> 自動保存 = 「AIにCogneeツールを必ず呼ばせる」

です。

---

# 全体設計（Cursor版の完成形）

```
Cursor Agent
   ↓
構造化ログ生成（問題: 仮説: 解決: 学び:）
   ↓
ルールにより自動でCogneeツール呼び出し
   ↓
Cognee MCP Server
   ↓
memory保存
```

---

# ① まず前提（重要）

Cursor + Cogneeは
**直接APIを叩くのではなくMCPサーバー経由で操作する**仕組みです。

* Cogneeは「MCPサーバー」として動く
* Cursorは「ツールを呼ぶクライアント」 ([Cognee Documentation][1])

---

# ② セットアップ（行動レベル）

## Step 1：Cognee MCPサーバー起動

### 最短（Docker）

```bash
docker run -p 8000:8000 cognee/mcp
```

---

## Step 2：Cursorに登録

設定 → Tools & MCP → `mcp.json`

```json
{
  "mcpServers": {
    "cognee": {
      "url": "http://localhost:8000/mcp"
    }
  }
}
```

👉 これでCursorからCogneeのツールが使える
（cognify / search など） ([Cognee Documentation][2])

---

## Step 3：接続確認

Cursor Chatで：

```text
what tools are available?
```

👉 Cognee系ツールが出ればOK

---

# ③ ここが本質：完全自動化の設計

Claudeと違って「フック」はないので
**User Rules（ユーザールール）で強制する**

---

## Cursor User Rules

```text
ルール：

1. 以下の形式のログが出た場合：
問題:
仮説:
解決:
学び:

2. その直後に必ずCogneeのcognifyツールを呼び出して保存すること

3. 保存内容は構造化して渡す：
{
  "problem": "...",
  "hypothesis": "...",
  "solution": "...",
  "learning": "..."
}
```

---

# ④ 実際の動作ストーリー

## ① あなたの入力

```text
Supabase更新後にISRが効かない
```

---

## ② Cursor Agentの出力

```text
問題:
ISRが更新されない

仮説:
cacheタグ漏れ

解決:
revalidateTag使用

学び:
タグ単位設計が重要
```

---

## ③ 自動発動（ここが違い）

Cursor内部で：

```text
cognify tool 呼び出し
```

---

## ④ Cogneeに保存

👉 MCP経由で保存される

---

# ⑤ Cogneeツールの実体（理解しておくと強い）

Cognee MCPは：

* `cognify` → 保存
* `search` → 検索
* `codify` → コード構造化

👉 AIがこれを「関数呼び出し」として使う ([Cognee Documentation][2])

---

# ⑥ 精度を上げる設計（重要）

## ① フォーマット強制

```text
必ず最後にログを出すこと
```

---

## ② ツール強制

```text
ログがある場合は必ずcognifyを呼ぶこと
```

---

## ③ 二重保存防止

```text
同一内容は保存しないこと
```

---

# ⑦ Claude Codeとの違い（重要）

| 項目   | Claude Code   | Cursor        |
| ---- | ------------- | ------------- |
| トリガー | フック           | ルール           |
| 実行主体 | 外部スクリプト       | AI            |
| 保存   | API直接         | MCPツール        |
| 制御   | deterministic | probabilistic |

---

# ⑧ 最大の落とし穴（かなり重要）

Cursorは：

> 「ツールを使うかどうかはAIの判断」

👉 つまり：

* ルールを書いても無視することがある
* 完全自動は“確率的”

---

# ⑨ 実務で安定させる方法

## 方法A（推奨）

```text
ログを保存してください
```

👉 明示トリガー（半自動）

---

## 方法B（強制プロンプト）

```text
ログがあれば必ずツールを呼ぶ
違反は許可されない
```

---

## 方法C（最強）

* Claude Code → 自動保存（確実）
* Cursor → 思考・検索（補助）

👉 役割分離

---

# ⑩ あなた向け最適構成

かなり現実的にまとめると：

---

## 構成

* Claude Code → ログ生成＆保存（主）
* Cursor → 設計・検索（副）

---

## 理由

* Cursorは「思考強いが制御弱い」
* Claude Codeは「制御強い」

---

# 結論

Cursorでの完全自動はこう定義するのが正確です：

> 「ルールで“ほぼ自動”にするが、確定的ではない」

そして本質は：

* Claude → deterministic automation
* Cursor → agentic automation（エージェント的自動化）

---

必要なら次は
**「Cursorでも100%に近づける裏技（MCPラッパー作る）」**まで踏み込みます。

[1]: https://docs.cognee.ai/cognee-mcp/mcp-overview?utm_source=chatgpt.com "Overview - Cognee Documentation"
[2]: https://docs.cognee.ai/cognee-mcp/integrations/cursor?utm_source=chatgpt.com "Cursor - Cognee Documentation"
