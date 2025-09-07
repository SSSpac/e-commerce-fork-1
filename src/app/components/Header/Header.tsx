import Link from "next/link";
import Image from "next/image";
import SideBar from "../SideBar/SideBar";

export default function Header() {
  return (
    <header className="bg-blue-300 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-xl text-red-400 font-bold">Commerce Store Originals</span>
        </Link>
        <SideBar />
      </div>
    </header>
  );
}