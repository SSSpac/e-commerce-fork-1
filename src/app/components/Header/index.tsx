import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import SideBar from '../SideBar';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white text-gray-200 shadow-lg">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-white">
            <Image src="/images/logo.png" alt="Logo" width={75} height={75}/>
          </Link>

          <div className="flex items-center space-x-6">
              <SideBar/>
          </div>
        </div>
      </nav>
    </header>
  );
}