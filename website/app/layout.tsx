import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'AutoFlow Hub - N8N Workflow Marketplace',
  description: 'The leading hub for N8N templates - Discover, purchase and download advanced automation workflows',
  keywords: ['N8N', 'Automation', 'Workflows', 'AI', 'Integration', 'Marketplace'],
  authors: [{ name: 'David775' }],
  openGraph: {
    title: 'AutoFlow Hub - N8N Workflow Marketplace',
    description: 'The leading hub for N8N templates',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoFlow Hub',
    description: 'The leading hub for N8N templates',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Column 1 */}
              <div>
                <h4 className="text-xl font-bold gradient-text mb-4">
                  AutoFlow Hub
                </h4>
                <p className="text-gray-400">
                  The leading hub for N8N templates. Discover advanced workflows for automation and process improvement.
                </p>
              </div>

              {/* Column 2 */}
              <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/catalog" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                      Catalog
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <h4 className="font-bold mb-4">Contact Us</h4>
                <p className="text-gray-400">
                  Have questions? We're happy to help!
                </p>
                <a
                  href="mailto:support@autoflowhub.com"
                  className="text-primary-400 hover:text-primary-300 transition-colors duration-200 mt-2 inline-block"
                >
                  support@autoflowhub.com
                </a>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>© 2024 AutoFlow Hub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}