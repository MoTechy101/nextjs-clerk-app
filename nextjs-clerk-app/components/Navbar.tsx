import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

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
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-slate-700 hover:text-indigo-600">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
