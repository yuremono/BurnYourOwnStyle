import type { Metadata, Viewport } from 'next';
import '../RatioKit.scss';
import './globals.css';

export const metadata: Metadata = {
  title: 'preview',
  description: 'ページの説明',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="author" content="著作者名" />
        <link rel="canonical" href="https://example.com/page" />
        <meta property="og:title" content="ページタイトル" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com/page" />
        <meta property="og:image" content="https://example.com/ogp.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@アカウント名" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
