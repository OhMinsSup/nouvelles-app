import Link from 'next/link';
import Avatars from '~/components/shared/avatars';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';

export default function Page() {
  return (
    <div className="flex h-screen bg-[#f7f9fc]">
      <div className="flex flex-col w-64 h-full bg-white p-5 border-r">
        <div className="flex items-center space-x-2 mb-5">
          <MenuIcon className="text-gray-400" />
          <span className="font-bold text-lg">Neusural</span>
        </div>
        <div className="flex flex-col space-y-2">
          <Link className="flex items-center space-x-2" href="#">
            <LayoutDashboardIcon className="text-gray-400" />
            <span>대시보드</span>
          </Link>
          <Link className="flex items-center space-x-2" href="#">
            <FolderIcon className="text-gray-400" />
            <span>내 문서함</span>
          </Link>
          <Link className="flex items-center space-x-2" href="#">
            <UsersIcon className="text-gray-400" />
            <span>사용자 관리</span>
          </Link>
          <Link className="flex items-center space-x-2" href="#">
            <SettingsIcon className="text-gray-400" />
            <span>설정</span>
          </Link>
        </div>
        <div className="mt-5">
          <span className="text-sm text-gray-400 uppercase">Mz시스템 관리</span>
          <div className="flex flex-col space-y-2 mt-2">
            <Link className="flex items-center space-x-2" href="#">
              <FileTextIcon className="text-blue-500" />
              <span className="text-blue-500">프로젝트</span>
            </Link>
            <Link className="flex items-center space-x-2" href="#">
              <CalendarIcon className="text-gray-400" />
              <span>일정관리</span>
            </Link>
            <Link className="flex items-center space-x-2" href="#">
              <BarChartIcon className="text-gray-400" />
              <span>통계/리포트</span>
            </Link>
            <Link className="flex items-center space-x-2" href="#">
              <CogIcon className="text-gray-400" />
              <span>설정</span>
            </Link>
          </div>
        </div>
        <div className="mt-auto">
          <Link className="flex items-center space-x-2" href="#">
            <HelpCircleIcon className="text-gray-400" />
            <span>도움말 센터</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5 overflow-hidden">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-3">
            <SearchIcon className="text-gray-400" />
            <Input placeholder="검색어 입력" />
          </div>
          <div className="flex items-center space-x-3">
            <BellIcon className="text-gray-400" />
            <Avatars src="/placeholder.svg?height=32&width=32" />
            <span>홍길동</span>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-col w-3/4 pr-3 overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <div className="text-xl font-bold">프로젝트 리스트</div>
              <Button className="bg-blue-500 text-white">+ 새 프로젝트</Button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>프로젝트 이름: 첫 번째 프로젝트</CardTitle>
                  <CardDescription>
                    STOVE 개발 프로젝트의 첫 번째 프로젝트입니다. 스토브 플랫폼
                    서비스의 기본적인 프레임을 구축하는 프로���트로, 웹과
                    모바일에서 사용할 수 있는 서비스를 개발하는 것을 목표로
                    합니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Avatars src="/placeholder.svg?height=32&width=32" />
                    <span>홍길동</span>
                    <Badge variant="secondary">진행중</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center">
              <Button variant="outline">더 보기</Button>
            </div>
          </div>
          <div className="flex flex-col w-1/4 pl-3">
            <div className="text-xl font-bold mb-5">내 할 일</div>
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <span>1</span>
                <span>프로젝트 리뷰</span>
                <Badge variant="default">3건</Badge>
              </div>
            </div>
            <div className="mt-10">
              <div className="text-xl font-bold mb-5">진행중인 프로젝트</div>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                  <span>프로젝트 이름: 첫 번째 프로젝트</span>
                  <Badge variant="secondary">진행중</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function CogIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 22v-2" />
      <path d="m17 20.66-1-1.73" />
      <path d="M11 10.27 7 3.34" />
      <path d="m20.66 17-1.73-1" />
      <path d="m3.34 7 1.73 1" />
      <path d="M14 12h8" />
      <path d="M2 12h2" />
      <path d="m20.66 7-1.73 1" />
      <path d="m3.34 17 1.73-1" />
      <path d="m17 3.34-1 1.73" />
      <path d="m11 13.73-4 6.93" />
    </svg>
  );
}

function FileTextIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

function FolderIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}

function HelpCircleIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function LayoutDashboardIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="9" rx="1" width="7" x="3" y="3" />
      <rect height="5" rx="1" width="7" x="14" y="3" />
      <rect height="9" rx="1" width="7" x="14" y="12" />
      <rect height="5" rx="1" width="7" x="3" y="16" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
