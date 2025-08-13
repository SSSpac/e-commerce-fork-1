import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import SideBar from '../SideBar';

export default function Header() {
  return (
    <header className="bg-gray-800 text-gray-200 shadow-lg">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-white">
            Shopping Heaven
          </Link>

          <div className="flex items-center space-x-6">
              <SideBar/>
          </div>
        </div>
      </nav>
    </header>
  );
}