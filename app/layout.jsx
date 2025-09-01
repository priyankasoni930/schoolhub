import './globals.css';
import Navigation from '@/components/navigation';

export const metadata = {
  title: 'SchoolHub - School Management System',
  description: 'A comprehensive school management system built with Next.js and MySQL',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Inter, sans-serif' }}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}