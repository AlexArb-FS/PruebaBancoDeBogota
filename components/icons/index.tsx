import React from 'react';

const createIcon = (path: React.ReactNode) => (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    {path}
  </svg>
);

export const MenuIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
);

export const LogoutIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
  />
);

export const HomeIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
  />
);

export const SettingsIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
  />
);

export const ProfileIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  />
);

export const EyeIcon = createIcon(
  <>
    <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </>
);

export const AcademicCapIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25c-3.13 0-6 1.01-6 2.25s2.87 2.25 6 2.25 6-1.01 6-2.25-2.87-2.25-6-2.25zm0 0v-8.25m0 0V6.75m0 0a2.25 2.25 0 00-2.25 2.25v.75m2.25-3a2.25 2.25 0 012.25 2.25v.75m-6.75 6.75h1.5l3-3.375 3 3.375h1.5" />
);

export const PlusIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
);