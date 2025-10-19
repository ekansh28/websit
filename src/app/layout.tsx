import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';

export const metadata: Metadata = {
  title: 'DNA Salon',
  description: 'Redefine Your Look',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
      </head>
      <body className="font-body antialiased bg-background">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
