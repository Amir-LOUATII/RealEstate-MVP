import { Home } from "lucide-react";
import Link from "next/link";
import { NavMenu } from "./nav-menu";
import { UserMenu } from "./user-menu";

export function Navbar() {
  return (
    <nav className="border-b w-full">
      <div className="container flex h-16 items-center px-4 justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6" />
          <span className="text-xl font-bold">LuxuryEstates</span>
        </Link>

        <div className="justify-self-start">
          <NavMenu />
        </div>
        <UserMenu />
      </div>
    </nav>
  );
}
