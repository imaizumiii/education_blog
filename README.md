# TEKITO - てきとーに勉強する学習サイト

## プロジェクト概要

**TEKITO**は、スマホユーザーをターゲットにした気軽に勉強できる学習サイトです。「てきとーに勉強してほしい」という願いから名付けられました。各機能は即レスポンスを意識した設計となっています。

## 対象プラットフォーム

- **メインターゲット**: スマートフォンユーザー
- **デザイン**: モバイルファースト、最大幅md、中央揃え

## 主要機能

- **レッスン**: テキスト、動画、インタラクティブな学習コンテンツ
- **クイズ**: 4択問題で理解度を確認
- **PDFツール**: 教育者向けの問題集生成機能

詳細な機能仕様については [PROJECT.md](./PROJECT.md) を参照してください。

## 技術スタック

- **フレームワーク**: Next.js 16.1.4
- **UIライブラリ**: React 19.2.3
- **スタイリング**: Tailwind CSS 4
- **アイコン**: lucide-react
- **言語**: TypeScript

## セットアップ

### 必要な環境

- Node.js 18以上
- npm / yarn / pnpm / bun

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

### ビルド

```bash
npm run build
```

### 本番環境での起動

```bash
npm start
```

## プロジェクト構造

```
education_blog/
├── app/              # Next.js App Router
│   ├── page.tsx      # ホームページ
│   └── ...
├── public/           # 静的ファイル
└── ...
```

## デプロイ

Vercel Platformを使用してデプロイすることを推奨します。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/hello-world)

詳細は [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) を参照してください。

## ドキュメント

- [PROJECT.md](./PROJECT.md) - プロジェクトの詳細仕様と実装計画
