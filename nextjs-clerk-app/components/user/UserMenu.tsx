"use client";

import { UserButton } from "@clerk/nextjs";

const userButtonAppearance = {
  elements: {
    avatarBox: "h-9 w-9",
    userButtonPopoverCard: "border border-slate-200 shadow-lg",
  },
};

const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path d="M3 4a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 13a1 1 0 011-1h5a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM12 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zM12 11a1 1 0 011-1h3a1 1 0 011 1v5a1 1 0 01-1 1h-3a1 1 0 01-1-1v-5z" />
  </svg>
);

export default function UserMenu() {
  return (
    <UserButton appearance={userButtonAppearance}>
      <UserButton.MenuItems>
        <UserButton.Link
          label="Dashboard"
          labelIcon={<DashboardIcon />}
          href="/dashboard"
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}
