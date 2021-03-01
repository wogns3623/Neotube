import { useEffect } from "react";

export function useInfiscrollEvent(listener: () => void, threshold: number) {
  useEffect(() => {
    // add scroll event to VideoContainer

    let infiScrollEvent = (event: Event): void => {
      let element = document.getElementsByClassName(
        "VideoContainer"
      )[0] as HTMLElement;

      let elementHeight =
        element.offsetHeight +
        element.offsetTop -
        document.documentElement.clientHeight;

      // console.log(window.scrollY, elementHeight, elementHeight - threshold);

      if (window.scrollY > elementHeight - threshold) {
        console.log("set loadVideo true");
        listener();
      }
    };

    // console.log("add infiscroll event");
    window.addEventListener("scroll", infiScrollEvent);

    return () => {
      // console.log("remove infiScroll event");
      window.removeEventListener("scroll", infiScrollEvent);
    };
  }, [listener, threshold]);
}
