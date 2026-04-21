"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import type { ReactNode } from "react";

type CTAProps = {
  className?: string;
  children?: ReactNode;
};

const baseSignIn =
  "text-sm font-medium text-slate-700 hover:text-indigo-600";

const baseSignUp =
  "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700";

export function SignInCTA({ className, children }: CTAProps) {
  return (
    <SignInButton mode="modal">
      <button className={className ?? baseSignIn}>
        {children ?? "Sign In"}
      </button>
    </SignInButton>
  );
}

export function SignUpCTA({ className, children }: CTAProps) {
  return (
    <SignUpButton mode="modal">
      <button className={className ?? baseSignUp}>
        {children ?? "Sign Up"}
      </button>
    </SignUpButton>
  );
}
