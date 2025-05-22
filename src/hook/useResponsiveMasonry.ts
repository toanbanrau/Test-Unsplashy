import { useEffect } from "react";
import { IUnplash } from "@/interfaces/unplash";

export const useResponsiveMasonry = (
  containerRef: React.RefObject<HTMLDivElement>,
  imageList: IUnplash[]
) => {
  useEffect(() => {
    const resizeAllGridItems = () => {
      if (!containerRef.current) return;

      const rowHeight = 20;
      const containerWidth = containerRef.current.clientWidth;
      const computedStyle = getComputedStyle(containerRef.current);
      const gap = parseInt(computedStyle.gap || "0");

      let columnCount = 4;
      if (window.matchMedia("(max-width: 768px)").matches) {
        columnCount = 2;
      }
      if (window.matchMedia("(max-width: 480px)").matches) {
        columnCount = 1;
      }

      const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;
      const items = containerRef.current.querySelectorAll(".gallery-item");

      items.forEach((item, index) => {
        const image = imageList[index];
        if (!image) return;

        const height = (image.height / image.width) * columnWidth;
        const span = Math.ceil((height + gap) / (rowHeight + gap));
        (item as HTMLElement).style.gridRowEnd = `span ${span}`;
      });
    };

    resizeAllGridItems();
    window.addEventListener("resize", resizeAllGridItems);
    return () => window.removeEventListener("resize", resizeAllGridItems);
  }, [imageList]);
};
