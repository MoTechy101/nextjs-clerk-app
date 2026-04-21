import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import type { ReactNode } from "react";

export default function LoadingGate({ children }: { children: ReactNode }) {
  return (
    <>
      <ClerkLoading>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"
            role="status"
            aria-label="Loading"
          />
        </div>
      </ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
    </>
  );
}
