import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import SideBar from '../SideBar';
import Image from 'next/image';

export default function Header() {
  return (
    
    <header className="sticky top-4 z-50 bg-white text-gray-200 shadow-lg h-18 border-b-2 border-red-500 shadow">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-white">
          <div className="h-8">
            <Image src="/images/logo.png" alt="Logo" width={100} height={100} className="-mt-12 text-bold object-contain"/>
          </div>
          </Link>
          
          <div className="flex items-center space-x-6">
              <SideBar/>
          </div>
        </div>
      </nav>
    </header>
  );
}