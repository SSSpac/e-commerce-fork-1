import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import SideBar from '../SideBar';
import Image from 'next/image';

export default function Header() {
  return (
    
    <header className="sticky top-4 z-50 bg-white text-black border-b-2 border-red-500 shadow">
    <nav className="w-full">
      <div className="flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center hover:opacity-80">
          <div className="h-8 sm:h-9 md:h-10">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="w-auto object-contain -mt-12"
              priority
            />
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <SideBar />
        </div>
      </div>
    </nav>
  </header>

  );
}