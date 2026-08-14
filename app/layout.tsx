import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Herrick Taskforce CQB Training',
  description: 'CQB Classroom Training Platform - Herrick Taskforce, Royal Gurkha Rifles',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-military-900">
        {children}
      </body>
    </html>
  );
}