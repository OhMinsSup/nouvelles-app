import { Loader } from "apps/nouvelles/src/components/ui/loader";

export default function Loading() {
  return (
    <div className="h-[85vh]">
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    </div>
  );
}
