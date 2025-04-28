import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simulación de Tratamiento de Cerdaza - BIOGINTEC',
  description: 'Simulación interactiva del proceso de tratamiento de cerdaza para producción de fertilizantes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-100`}>{children}</body>
    </html>
  );
}
