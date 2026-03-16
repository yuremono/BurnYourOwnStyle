# 部分マージガイド

特定のファイルやディレクトリだけを別ブランチにマージする手順。

---

## 基本手順

```bash
# 1. ターゲットブランチに切り替え
git checkout main

# 2. ソースブランチから特定のファイル/ディレクトリだけ取り込む
git checkout react -- .claude
git checkout react -- scss
git checkout react -- CLAUDE.md
git checkout react -- README.md

# 3. コミット
git commit -m "feat: merge specific files from react branch"

# 4. プッシュ
git push origin main

# 5. 元のブランチに戻る
git checkout react
```

---

## よくある問題と解決方法

### 1. ローカルの変更があって checkout できない

```
error: Your local changes to the following files would be overwritten by checkout:
        .gitignore
Please commit your changes or stash them before you switch branches.
```

**解決方法：**

```bash
# 変更を一時退避
git stash

# ブランチ切り替え後に復元
git stash pop
```

または、コミットしてから切り替える。

---

### 2. .DS_Store が混入している

`.gitignore` に書いてあるのに `.DS_Store` がコミットされてしまう。

**原因：** 既にコミット済みのファイルは `.gitignore` に追加しても自動的には除外されない。

**解決方法：**

```bash
# 追跡されている .DS_Store を確認
git ls-files | grep .DS_Store

# インデックスから削除
git ls-files | grep .DS_Store | xargs -r git rm --cached

# コミット
git commit -m "chore: remove .DS_Store from tracking"

# プッシュ
git push origin main
```

---

### 3. コミットしたのにリモートに反映されない

**原因：** プッシュしていない。

**解決方法：**

```bash
git push origin main
```

---

## .gitignore の書き方

```gitignore
# ルート直下のみ
/.DS_Store

# すべてのディレクトリ（推奨）
.DS_Store

# または明示的に
**/.DS_Store
```

---

## 注意事項

- `git rm --cached` はインデックスから削除するだけで、ローカルファイルは残る
- 既に追跡されているファイルは `.gitignore` に追加するだけでは除外されない
- 部分マージは履歴が分断されるため、チーム開発では慎重に使う

---

## 特定のディレクトリだけをコミット・プッシュする

```bash
# 1. 特定のディレクトリだけステージング
# 2. コミット
# 3. プッシュ
git add docs/
git commit -m "docs: add partial merge guide"
git push origin main
```

**ポイント：**
- `git add docs/` で特定ディレクトリだけをステージング
- 他の変更はステージングされず、コミットに含まれない
- 変更を確認したい場合は `git status` を実行
