import Link from "next/link";

export function NavMenu() {
  return (
    <div className="hidden md:flex items-center space-x-4 ml-auto">
      <Link href="/properties" className="text-sm font-medium">
        Properties
      </Link>
    </div>
  );
}
