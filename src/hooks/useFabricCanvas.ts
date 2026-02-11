import { useEffect, useState } from "react";
import fabric  from "fabric";

export const useFabricCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "#fff",
      preserveObjectStacking: true,
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, [canvasRef]);

  return canvas;
};
