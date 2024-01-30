'use client';
import { usePathname } from 'next/navigation';

export default function Modal() {
  const pathname = usePathname();

  console.log('pathname??', pathname);

  return <div>Modal</div>;
}
