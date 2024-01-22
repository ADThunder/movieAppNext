"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
type Props = {};

export default function Navbar({}: Props) {
  const pathName = usePathname();

  return (
    <div className="flex max-w-7xl mx-auto w-full justify-between items-center py-4 px-2">
      <Link href={"/"} className="font-bold text-4xl">
        Movies
      </Link>

      <div className="flex gap-3 text-xl font-semibold">
        <Link
          href="/"
          className={`${
            pathName === "/" && "border-b-2 border-b-blue-400 text-blue-400"
          }`}
        >
          Home
        </Link>
        <Link
          href="/favorites"
          className={`${
            pathName === "/favorites" &&
            "border-b-2 border-b-blue-400 text-blue-400"
          }`}
        >
          Favorites
        </Link>
      </div>
    </div>
  );
}
