import type { Metadata } from 'next';
import Link from 'next/link';
import KakaoAuthButton from '~/components/auth/kakao-auth-button';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default function Pages() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            className="mr-2 h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">로그인</h1>
            <p className="text-sm text-muted-foreground">
              로그인하여 더 많은 기능을 사용하세요.
            </p>
          </div>
          <KakaoAuthButton />
          <p className="px-8 text-center text-sm text-muted-foreground space-x-1">
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="/terms"
            >
              서비스 이용약관
            </Link>
            <span className="relative inline-block text-center bottom-[3px]">
              .
            </span>
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="/privacy"
            >
              개인정보처리방침
            </Link>
            <span className="relative inline-block text-center bottom-[3px]">
              .
            </span>
            <Link
              className="hover:text-brand underline underline-offset-4"
              href="/cookie"
            >
              쿠키정책
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
