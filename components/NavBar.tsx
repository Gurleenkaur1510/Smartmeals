'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Meal Planner', href: '/meal-planner' },
    { name: 'All Meals', href: '/meals' },
    { name: 'Add Meal', href: '/meals/add' },
    { name: 'Login', href: '/auth/signin' },
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
          <div className="hidden md:flex space-x-6">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
