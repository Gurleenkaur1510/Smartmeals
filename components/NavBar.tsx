'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Meal Planner', href: '/meal-planner' },
    { name: 'All Meals', href: '/meals' },
    { name: 'Add Meal', href: '/meals/add' },
  ];

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wide hover:text-white">
            SmartMeals
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`hover:bg-green-700 px-3 py-2 rounded-md transition ${
                  pathname === link.href ? 'bg-green-800' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}

            {status === 'authenticated' ? (
              <button
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth/signin"
                className={`hover:bg-green-700 px-3 py-2 rounded-md transition ${
                  pathname === '/auth/signin' ? 'bg-green-800' : ''
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
