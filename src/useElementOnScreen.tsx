import { useState, useEffect, useRef} from "react";

export const useElementOnScreen = (options: any) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    const callbackFunction = (entries: any) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting)
    }

    useEffect(() => {
      const observer = new IntersectionObserver(callbackFunction, options);
      if (containerRef.current) observer.observe(containerRef.current);

      return () => {
        if (containerRef.current) observer.unobserve(containerRef.current)
      }
    }, [containerRef, isVisible]);

    return [containerRef, isVisible];
  }
}