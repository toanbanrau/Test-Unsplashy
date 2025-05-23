import { useEffect, useCallback } from "react";
import { IUnplash } from "@/interfaces/unplash";

interface UseMasonryLayoutOptions {
  itemSelector?: string;
  rowHeight?: number;
  gapSize?: number;
  columnCounts?: {
    default?: number;
    tablet?: number;
    mobile?: number;
  };
}

export function useMasonryLayout(
  containerRef: React.RefObject<HTMLElement | null>,
  items: IUnplash[],
  options: UseMasonryLayoutOptions = {}
) {
  const {
    itemSelector = ".gallery-item",
    rowHeight = 20,
    gapSize,
    columnCounts = {
      default: 4,
      tablet: 2,
      mobile: 1
    }
  } = options;

  const resizeGridItems = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const computedStyle = getComputedStyle(containerRef.current);
    const gap = gapSize ?? parseInt(computedStyle.gap || "0");

    // Determine column count based on screen size
    let columnCount = columnCounts.default ?? 4;
    if (window.matchMedia("(max-width: 768px)").matches) {
      columnCount = columnCounts.tablet ?? 2;
    }
    if (window.matchMedia("(max-width: 480px)").matches) {
      columnCount = columnCounts.mobile ?? 1;
    }

    const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;
    const elements = containerRef.current.querySelectorAll(itemSelector);

    elements.forEach((el, index) => {
      const item = items[index];
      if (!item) return;

      // Handle missing dimensions
      if (!item.width || !item.height) {
        console.warn(`Image ${item.id} is missing dimensions`);
        return;
      }

      const height = (item.height / item.width) * columnWidth;
      const span = Math.ceil((height + gap) / (rowHeight + gap));
      (el as HTMLElement).style.gridRowEnd = `span ${span}`;
    });
  }, [containerRef, items, itemSelector, rowHeight, gapSize, columnCounts]);

  useEffect(() => {

    resizeGridItems();

 
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(resizeGridItems, 150);
    };

    window.addEventListener("resize", handleResize);


    const handleImageLoad = () => {
      resizeGridItems();
    };

    const images = containerRef.current?.querySelectorAll("img");
    images?.forEach(img => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
      images?.forEach(img => {
        img.removeEventListener("load", handleImageLoad);
      });
    };
  }, [resizeGridItems, containerRef]);
} 