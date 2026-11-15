import './globals.css';

import Providers from '@/components/providers';
import ScrollProgress from '@/components/effects/ScrollProgress';
import ScrollVelocity from '@/components/effects/ScrollVelocity';
import LiquidCursor from '@/components/effects/LiquidCursor';
import RevealObserver from '@/components/effects/RevealObserver';

export const metadata = {
  title: 'Asmit Vishwakarma',
  description:
    'Portfolio of Asmit Vishwakarma , UI/UX designer, graphic designer, developer and 3D artist based in Mumbai. Currently a Design Intern at WeFrameTech.',
  applicationName: 'Asmit Vishwakarma',
  authors: [{ name: 'Asmit Vishwakarma' }],
  keywords: [
    'Asmit Vishwakarma',
    'UI/UX designer',
    'graphic designer',
    'developer',
    '3D artist',
    'Mumbai',
    'portfolio',
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f4f4f2',
};

/**
 * Runs before paint so a saved dark theme never flashes light on load.
 * Mirrors the original static site's inline script.
 */
const themeScript = `
(function () {
  try {
    var theme = localStorage.getItem('theme');
    if (!theme) theme = 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (error) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;filter:none !important}`}</style>
        </noscript>
      </head>

      <body>
        <Providers>
          <ScrollProgress />
          <ScrollVelocity />
          <LiquidCursor />
          <RevealObserver />
          {children}
        </Providers>
      </body>
    </html>
  );
}
