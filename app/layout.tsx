import './globals.css';
import { Inter } from 'next/font/google';
import SessionWrapper from '@/components/SessionWrapper';
import NavBar from '@/components/NavBar';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SmartMeals',
  description: 'Your personalized meal planner',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
         <body className={inter.className}>
        <SessionWrapper>
          <NavBar />
          <main className="max-w-6xl mx-auto mt-10 p-4">{children}</main>
        </SessionWrapper>
      </body>
     
    </html>
  );
}
