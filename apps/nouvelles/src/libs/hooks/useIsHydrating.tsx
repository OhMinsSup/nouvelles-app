import { useState } from "react";
import { isBrowser } from "apps/nouvelles/src/libs/browser/dom";

export default function useIsHydrating(queryString: string) {
  const [isHydrating] = useState(
    () => isBrowser && Boolean(document.querySelector(queryString))
  );
  return isHydrating;
}
