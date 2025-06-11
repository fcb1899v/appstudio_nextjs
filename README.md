# AppStudio Next.js Project

このプロジェクトは、複数のモバイルアプリのランディングページを提供するNext.jsベースのWebサイトです。

## 🚀 技術スタック

- **Framework**: Next.js 15.1.0
- **Language**: TypeScript 5.5.4
- **Styling**: Tailwind CSS
- **Analytics**: Google Analytics 4
- **Advertising**: Google AdSense
- **Deployment**: Firebase Hosting
- **Cookie Management**: Cookiebot

## 📋 機能

- **多言語対応**: 日本語・英語の切り替え
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **GDPR準拠**: Cookie同意管理システム
- **アナリティクス**: 詳細なユーザー行動追跡
- **SEO最適化**: メタタグ・構造化データ対応
- **パフォーマンス最適化**: 静的エクスポート・画像最適化

## 🛠️ セットアップ

### 前提条件

- Node.js 18.0.0以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd appstudio_next

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

## 🔧 環境変数

プロジェクトルートに `.env.local` ファイルを作成し、以下の変数を設定してください：

```bash
# Google Analytics
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Google AdSense
NEXT_PUBLIC_ADSENSE=ca-pub-XXXXXXXXXX

# Cookiebot
NEXT_PUBLIC_COOKIEBOT_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

# 環境設定
NODE_ENV=development
```

## 📁 プロジェクト構造

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # グローバルスタイル
│   ├── layout.tsx      # ルートレイアウト
│   └── page.tsx        # ホームページ
├── components/         # Reactコンポーネント
│   ├── Common/         # 共通コンポーネント
│   ├── Home/           # ホームページ専用
│   └── Apps/           # アプリ専用
├── hooks/              # カスタムフック
├── utils/              # ユーティリティ関数
└── types/              # TypeScript型定義
```

## 🍪 GDPR準拠

このプロジェクトはGDPR準拠のCookie同意管理システムを実装しています：

- **Cookie同意バナー**: ユーザーがCookieの種類を選択可能
- **詳細制御**: 必要・分析・マーケティングCookieの個別制御
- **Google Analytics**: 分析同意時のみ読み込み
- **AdSense**: マーケティング同意時のみ読み込み
- **Cookie管理**: 同意撤回時の自動クリーンアップ

### Cookieの種類

1. **必要Cookie**: 常に有効、基本機能に必須
2. **分析Cookie**: Google Analytics追跡（同意必要）
3. **マーケティングCookie**: AdSense・広告（同意必要）

## 📊 アナリティクス

詳細なユーザー行動追跡を実装：

- ページビュー追跡
- スクロール深度測定
- 滞在時間測定
- メニュー操作追跡
- アプリダウンロード追跡
- 外部リンククリック追跡

## 🚀 デプロイ

### Firebase Hosting

```bash
# ビルド
npm run build

# デプロイ
npm run deploy
```

### その他のプラットフォーム

- **Vercel**: `vercel --prod`
- **Netlify**: `npm run build` 後に `out/` ディレクトリをデプロイ

## 🧪 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm run start

# リンター実行
npm run lint

# Firebaseデプロイ
npm run deploy
```

## 📱 対応アプリ

- **Japanese**: 日本語学習アプリ
- **Phonics**: 英語発音学習アプリ
- **Allowance**: おこづかい管理アプリ
- **Crossing**: 信号待ちゲーム
- **Signal**: 信号シミュレーター
- **Toilet**: トイレトレーニングアプリ
- **Transit**: 交通機関アプリ
- **Elevator**: エレベーターシミュレーター

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 📞 サポート

問題や質問がある場合は、[Issues](https://github.com/your-repo/issues) でお知らせください。
