"use client";

import { UserProfile } from "@clerk/nextjs";

export default function ProfileCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Your profile</h2>
        <p className="mt-1 text-sm text-slate-600">
          Manage your account, security, and connected services.
        </p>
      </div>
      <div className="flex justify-center">
        <UserProfile />
      </div>
    </div>
  );
}
