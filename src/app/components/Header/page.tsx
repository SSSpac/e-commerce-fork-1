import Link from "next/link";
import Image from "next/image";
import SideBar from "../SideBar";

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png" // Update with your actual logo path
            alt="Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-xl font-bold">E-Commerce Store</span>
        </Link>
        <SideBar />
      </div>
    </header>
  );
}