import { useState, useEffect } from "react";

export function useCarousel(items, delay = 15000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, delay);

    return () => clearInterval(interval);
  }, [items, delay]);

  return [index, setIndex];
}
