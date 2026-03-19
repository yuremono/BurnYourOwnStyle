# Cognee /DB スキル導入ガイド

## 概要

Cursor チャットで `/DB` と入力すると、会話内容を problem/hypothesis/solution/learning に成形して Cognee の知識グラフに保存するスキルです。

## 前提条件

- Cognee MCP が stdio モードでセットアップ済み
- `~/.cursor/mcp.json` に cognee が登録済み
- **重要**: `/Users/yanoseiji/cognee-repo/cognee-mcp/.env` の `LLM_API_KEY` を実際の API キーに置き換えること（OpenAI 互換キーなら任意のプロバイダー可）

## 使い方

1. Cursor のチャットで `/DB` と入力する
2. オプションで `lookback{N}` を指定: `/DB lookback3` など
3. オーギュメントでローカルにも保存: `/DB ローカル保存` または `/DB プロジェクトに保存`

## 振り返り（lookback）

- 形式: `lookback{N}` のみ（例: lookback3, lookback5）
- 単純な数値（例: `/DB 3`）は受け付けない
- 該当なしと判断した場合、過去のチャット履歴を振り返って再解析する（最大 10 ターン程度）
- 運用後に `~/.cursor/skills/DB/SKILL.md`（ユーザーレベル）を直接編集して調整可能

## データセット

- cognify は `main_dataset` に保存（Cognee のデフォルト）

## ローカル確認

### Cognee データの保存場所

- **パス**: `{cognee-mcp}/.venv/lib/python3.11/site-packages/cognee/.cognee_system/databases`
- **例**: `/Users/yanoseiji/cognee-repo/cognee-mcp/.venv/lib/python3.11/site-packages/cognee/.cognee_system/databases`
- **内容**: SQLite（リレーショナル）、LanceDB（ベクトル）、Kuzu（グラフ）
- **確認方法**: `sqlite3` で SQLite を開くか、MCP の `search`（CHUNKS）でテキストを取得

### DB.md のローカル保存（オーギュメント時）

- **保存先**: `memory/DB.md`（プロジェクトルート直下）
- **トリガー**: `/DB ローカル保存` または `/DB プロジェクトに保存` と入力した場合のみ
- **閲覧方法**: チャットで `@memory/DB.md` を指定して参照可能

## search の使い方（検索タイプの選び方）

| search_type | 速度 | 用途 | 備考 |
|-------------|------|------|------|
| **CHUNKS** | 最速 | テキスト断片の取得、引用 | **推奨**: LLM 不要、タイムアウトしにくい |
| SUMMARIES | 速い | 要約・概要の取得 | 事前生成された要約を返す |
| GRAPH_COMPLETION | 遅い | 自然言語 Q&A、複雑な推論 | LLM 使用、**長時間で Aborted になりやすい** |
| RAG_COMPLETION | 中 | ドキュメント検索 | LLM 使用 |
| FEELING_LUCKY | 可変 | 自動選択 | 内部で LLM を呼ぶ場合あり |

**注意**: `GRAPH_COMPLETION` は LLM を呼ぶため MCP のタイムアウトで Aborted になることがある。まずは `CHUNKS` で試すことを推奨。

## ログの場所・確認方法

- **ログファイル**: `{cognee-mcp}/.venv/lib/python3.11/site-packages/logs/` 配下
  - 例: `/Users/yanoseiji/cognee-repo/cognee-mcp/.venv/lib/python3.11/site-packages/logs/YYYY-MM-DD_HH-MM-SS.log`
- **確認コマンド**:
  ```bash
  ls -lt /Users/yanoseiji/cognee-repo/cognee-mcp/.venv/lib/python3.11/site-packages/logs/ | head -5
  tail -100 /Users/yanoseiji/cognee-repo/cognee-mcp/.venv/lib/python3.11/site-packages/logs/最新のログファイル
  ```
- **cognify_status** ツールでもバックグラウンドタスクのエラーが表示される

## トラブルシュート

| 現象 | 対処 |
|------|------|
| cognify ツールが見つからない | Cursor を再起動または MCP リフレッシュ。Cognee MCP が stdio で起動しているか確認 |
| LLM_API_KEY エラー（`your_openai_api_key_here` 等） | `.env` が読み込まれていない可能性。`~/.cursor/mcp.json` で `run-cognee-mcp.sh` ラッパーを使用しているか確認。`.env` の `LLM_API_KEY` を実際のキーに置き換える |
| main_dataset に Data items: 0 | cognify が失敗している。ログで `Background cognify task failed` を確認。API キー・プロバイダー設定を確認 |
| cognify_status が空の `{}` | パイプラインがまだ実行されていない、または失敗済み。ログと `_task_errors` を確認。cognify 成功後に再試行 |
| search が長時間で Aborted | `GRAPH_COMPLETION` や `RAG_COMPLETION` は LLM 呼び出しで時間がかかる。`CHUNKS` や `SUMMARIES` を試す |
| 保存が完了しない | cognify はバックグラウンド実行。`cognify_status` ツールで進捗確認可能 |
| プロセスが残る | stdio モード採用時、Cursor 終了時にプロセスも自動終了するはず。残る場合は `pkill -f cognee-mcp` |

## セットアップ（初回のみ）

1. **cognee リポジトリ**: `/Users/yanoseiji/cognee-repo/cognee-mcp` に clone 済み
2. **uv sync**: `/Users/yanoseiji/cognee-repo/cognee-mcp` で `uv sync` 済み
3. **mcp.json**: `~/.cursor/mcp.json` に cognee を登録
   - server.py が cognee-mcp ディレクトリの .env を自動読み込みするため、uv で直接起動で可
   - .env が読まれない場合は `run-cognee-mcp.sh` ラッパーを command に指定
   ```json
   "cognee": {
     "command": "uv",
     "args": ["--directory", "/Users/yanoseiji/cognee-repo/cognee-mcp", "run", "cognee-mcp"]
   }
   ```
4. **.env**: `/Users/yanoseiji/cognee-repo/cognee-mcp/.env` を編集
   - **Gemini 利用時**: `LLM_API_KEY` と `EMBEDDING_API_KEY` に [Google AI Studio](https://aistudio.google.com/app/api-keys) の API キーを入力
   - **OpenAI 等**: `LLM_PROVIDER` を変更し、`LLM_API_KEY` を設定。Azure/OpenRouter の場合は `LLM_ENDPOINT` も設定

## スキル配置

- **ユーザーレベル**: `~/.cursor/skills/DB/SKILL.md`（全プロジェクトで利用可能）

## 参考リンク

- [Cognee Cursor Integration](https://docs.cognee.ai/cognee-mcp/integrations/cursor)
- [Cognee MCP Quickstart](https://docs.cognee.ai/cognee-mcp/mcp-quickstart)
- [docs/TALK_TO_GPT.md](./TALK_TO_GPT.md)（JAT-GPT との相談履歴）
