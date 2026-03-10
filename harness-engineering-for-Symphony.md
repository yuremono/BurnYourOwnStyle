🗺️ AGENTS.md (Knowledge Map)

1. 役割と目的

あなたは本リポジトリの全領域において、設計・実装・検証を完結させるエンジニアです。
全ての推論は、本リポジトリ内でバージョン管理されているアーティファクト（コード、Markdown、スキーマ）のみに基づいて行われます。アクセス不可能な外部コンテキストは考慮しません。

2. リポジトリマップ (System of Record)

情報の所在は以下の構造に限定されます。エージェントはこれを作業のマップとして使用してください。

AGENTS.md               # 知識の地図（本ファイル）
ARCHITECTURE.md          # 階層構造、パッケージ境界、依存関係の方向性
docs/
├── design-docs/        # 設計ドキュメント
│   ├── index.md        # インデックス
│   ├── core-beliefs.md # 中核的信念（意思決定の原則）
│   └── ...
├── exec-plans/         # 実行プラン
│   ├── active/         # 現在進行中のタスク（進捗と意思決定ログ）
│   ├── completed/      # 過去の意思決定ログ（履歴コンテキスト）
│   └── tech-debt-tracker.md # 技術的負債の追跡
├── generated/          # 自動生成されたリファレンス
│   └── db-schema.md    # データベーススキーマ等
├── product-specs/      # プロダクト仕様書
│   ├── index.md
│   ├── new-user-onboarding.md
│   └── ...
├── references/         # LLM向け技術リファレンス
│   ├── design-system-reference-llms.txt
│   ├── nixpacks-llms.txt
│   ├── uv-llms.txt
│   └── ...
├── DESIGN.md           # システム設計の基本原則
├── FRONTEND.md         # UIスタック、共通コンポーネント規約
├── PLANS.md            # ハイレベルな開発計画
├── PRODUCT_SENSE.md    # ユーザー体験の核心、プロダクトの原則
├── QUALITY_SCORE.md    # 各領域の品質評価と負債の追跡
├── RELIABILITY.md      # 信頼性要件とエラー処理方針
└── SECURITY.md         # セキュリティ規約とガードレール


3. 実行プロトコル (Mechanical Execution)

段階的開示: タスク開始時、まず本ファイルを確認し、関連するドキュメントを特定して読み込むこと。

プランニング: 変更を伴う作業の前に、必ず docs/exec-plans/active/ にプランをチェックインすること。

不変条件の遵守: ARCHITECTURE.md および FRONTEND.md 等の境界条件を遵守し、機械的に正しさを証明すること。

継続的同期: 実装中にドキュメントとコードの乖離を発見した場合、ドキュメントの修正をタスクに含めること。

4. 技術的選好 (Standard Invariants)

境界におけるデータの厳格な検証（解析）を優先する。

依存関係の不透明性を排除し、直接的で検査可能な実装を選択する。