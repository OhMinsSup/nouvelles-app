import React from 'react';

interface FooterMobileProps {
  children: React.ReactNode;
}

export default function FooterMobile({ children }: FooterMobileProps) {
  return (
    <nav
      className="md:hidden fixed bottom-0 z-40 flex w-full items-center justify-around border-t bg-white py-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
      data-name="mobile-footer"
    >
      {children}
    </nav>
  );
}
