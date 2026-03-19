# Cursor スキル 公式リファレンスまとめ

Cursor 公式ドキュメントと Agent Skills 仕様（agentskills.io）を確認した結果。確実にスキルをトリガーするための環境構築指針。

---

## 公式ソース

- [Agent Skills | Cursor Docs](https://cursor.com/docs/context/skills)
- [Skills | Cursor Help](https://cursor.com/help/customization/skills)
- [Agent Skills Specification](https://agentskills.io/specification)

---

## 1. フォルダ名と name の一致（重要）

**仕様**: `name` は **小文字・数字・ハイフンのみ**。**親フォルダ名と一致**させる。

| 項目 | 仕様 | 現在の DB スキル | 問題 |
|------|------|------------------|------|
| フォルダ名 | 小文字推奨 | `DB`（大文字） | 仕様違反の可能性 |
| name | 小文字のみ | `DB`（大文字） | 仕様違反 |

**修正案**: フォルダを `db` にリネームし、frontmatter の `name` を `db` にする。呼び出しは `/db`。

---

## 2. disable-model-invocation（確実なトリガーに必須）

**仕様**（Cursor Docs）:

> `disable-model-invocation: true` にすると、スキルは **明示的に `/skill-name` で呼び出したときのみ** コンテキストに含まれる。エージェントはコンテキストから自動適用しない。

**デフォルト（false）**: エージェントが「関連あり」と判断したときだけ適用 → ユーザーが `/DB` と打っても無視されやすい。

**推奨**: スラッシュコマンドのように「呼び出したときだけ」動かしたい場合は、**必ず `disable-model-invocation: true` を付ける**。

---

## 3. スキル配置ディレクトリ

| 場所 | スコープ |
|------|----------|
| `.agents/skills/` | プロジェクト |
| `.cursor/skills/` | プロジェクト |
| `~/.cursor/skills/` | ユーザー（グローバル） |

DB スキルは `~/.cursor/skills/DB/` にあり、読み込み対象としては問題ない。プロジェクト固有の場合は `.cursor/skills/` や `.agents/skills/` に置く。

---

## 4. frontmatter の必須項目

| フィールド | 必須 | 制約 |
|------------|------|------|
| `name` | Yes | 小文字・数字・ハイフンのみ、1〜64文字、フォルダ名と一致 |
| `description` | Yes | 1〜1024文字、何をするか・いつ使うかが分かる説明 |

---

## 5. DB スキル向け推奨修正

1. **フォルダ名**: `DB` → `db`
2. **frontmatter**: `name: db` に変更
3. **frontmatter**: `disable-model-invocation: true` を追加
4. **呼び出し**: `/db` で実行（小文字）

---

## 6. スキルの表示確認

1. Cursor Settings → Rules（Cmd+Shift+J / Ctrl+Shift+J）
2. スキル一覧で `db` が表示されているか確認
3. `/` 入力時に `db` が候補に出るか確認
