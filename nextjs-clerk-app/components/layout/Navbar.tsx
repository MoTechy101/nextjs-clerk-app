import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import UserMenu from "@/components/user/UserMenu";
import { SignInCTA, SignUpCTA } from "@/components/auth/AuthButtons";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-lg font-bold text-slate-900 hover:text-indigo-600"
        >
          TodoApp
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-700 hover:text-indigo-600"
            >
              Dashboard
            </Link>
            <UserMenu />
          </SignedIn>

          <SignedOut>
            <SignInCTA />
            <SignUpCTA />
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
