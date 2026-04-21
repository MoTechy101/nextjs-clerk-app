"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { SignInCTA } from "./AuthButtons";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

const defaultFallback = (
  <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
    <p className="text-slate-600">Please sign in to continue.</p>
    <SignInCTA className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700" />
  </div>
);

export default function RequireAuth({ children, fallback }: Props) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>{fallback ?? defaultFallback}</SignedOut>
    </>
  );
}
