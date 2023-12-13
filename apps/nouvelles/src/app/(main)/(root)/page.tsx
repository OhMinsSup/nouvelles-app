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
