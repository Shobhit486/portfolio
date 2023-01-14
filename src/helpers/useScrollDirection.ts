import { useRef, useSyncExternalStore } from "react";

type ScrollDirection = "up" | "down" | "init";

export default function useScrollDirection(
  headerRef?: React.RefObject<HTMLElement>
) {
  const yPositionRef = useRef(0);
  const prevDirectionRef = useRef<ScrollDirection>("init");

  const scrollDirection: ScrollDirection = useSyncExternalStore(
    (callback) => {
      window.addEventListener("scroll", callback);
      return () => window.removeEventListener("scroll", callback);
    },
    () => {
      const headerHeight = headerRef?.current?.clientHeight ?? 104;
      const delta = window.scrollY - yPositionRef.current;
      yPositionRef.current = window.scrollY;

      if (window.scrollY <= headerHeight) {
        return (prevDirectionRef.current = "init");
      }

      if (delta === 0) {
        return prevDirectionRef.current;
      }

      const direction = delta < 0 ? "up" : "down";
      return (prevDirectionRef.current = direction);
    },
    () => "init"
  );

  return scrollDirection;
}
