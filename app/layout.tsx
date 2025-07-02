import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/header';
import Footer from '@/components/footer';
import './globals.css';
import { createClient } from '@/lib/supabase/server';
import React, { Suspense } from 'react';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Golf Directory App',
  description: 'A map-based directory of golf courses in Singapore and Malaysia.',
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  display: 'swap',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  let states: string[] = [];
  const { data: statesData, error: statesError } = await supabase
    .from('golf_courses')
    .select('state')
    .eq('country', 'Malaysia')
    .not('state', 'is', null);

  if (statesError) {
    console.error('Error fetching states:', statesError);
  } else {
    states = [...new Set(statesData.map((item: any) => item.state))].sort();
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased flex flex-col min-h-[calc(100vh-80px)]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
                    <Suspense fallback={<div>Loading...</div>}>
            <Header states={states} />
          </Suspense>
          <main className="flex-grow md:h-[calc(100%_-_80px)]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

