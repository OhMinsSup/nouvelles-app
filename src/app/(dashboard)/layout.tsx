import Aside from "~/components/aside";
import { Navbar } from "~/components/navbar";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  return (
    <div className="drawer min-h-screen bg-base-200 lg:drawer-open">
      <Aside>
        <main className="drawer-content">
          <div className="grid grid-cols-12 grid-rows-[min-content] gap-y-12 p-4 lg:gap-x-12 lg:p-10">
            {children}
          </div>
        </main>
      </Aside>
    </div>
  );
}
