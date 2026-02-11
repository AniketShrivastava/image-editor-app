import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

export const useFabricCanvas = () => {
    const canvasRef = useRef<fabric.Canvas | null>(null);
    const htmlCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const cropRectRef = useRef<fabric.Rect | null>(null);

    const [imageObj, setImageObj] = useState<fabric.Image | null>(null);
    useEffect(() => {
        if (!htmlCanvasRef.current) return;
        const canvas = new fabric.Canvas(htmlCanvasRef.current, {
            width: 900,
            height: 400,
            backgroundColor: "#f3f4f6",
            
        });
        canvasRef.current = canvas;
        return () => {
            canvas.dispose();
        };
    }, []);
    const setSelectMode = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        canvas.isDrawingMode = false;
        canvas.selection = true;
        canvas.defaultCursor = "default";
        canvas.renderAll();
    };
    const enableDrawing = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        canvas.isDrawingMode = true;
        const brush = new fabric.PencilBrush(canvas);
        brush.width = 3;
        brush.color = "red";
        canvas.freeDrawingBrush = brush;
        canvas.selection = false;
        canvas.defaultCursor = "crosshair";
        canvas.renderAll();
    };
    const disableDrawing = () => {
        setSelectMode();
    };
   const uploadImage = async (file: File) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const reader = new FileReader();

  reader.onload = async (e) => {
    const result = e.target?.result;
    if (!result || typeof result !== "string") return;

    const img = await fabric.Image.fromURL(result);

    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();

    const scale = Math.min(
      canvasWidth / (img.width ?? 1),
      canvasHeight / (img.height ?? 1)
    );

    img.scale(scale);

    canvas.clear();
    canvas.add(img);

    canvas.centerObject(img);
    canvas.setActiveObject(img);

    canvas.renderAll();
    setImageObj(img);
  };

  reader.readAsDataURL(file);
};

    const addRectangle = () => {
        if (!canvasRef.current) return;
        setSelectMode();
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            width: 150,
            height: 100,
            fill: "transparent",
            stroke: "blue",
            strokeWidth: 2,
        });
        canvasRef.current.add(rect);
    };
    const addCircle = () => {
        if (!canvasRef.current) return;
        setSelectMode();
        const circle = new fabric.Circle({
            left: 150,
            top: 150,
            radius: 60,
            fill: "transparent",
            stroke: "green",
            strokeWidth: 2,
        });
        canvasRef.current.add(circle);
    };
    const addText = () => {
        if (!canvasRef.current) return;
        setSelectMode();
        const text = new fabric.IText("Edit Text", {
            left: 200,
            top: 200,
            fontSize: 24,
            fill: "black",
        });
        canvasRef.current.add(text);
        canvasRef.current.setActiveObject(text);
    };
    const rotateImage = () => {
        if (!imageObj || !canvasRef.current) return;
        imageObj.rotate((imageObj.angle || 0) + 90);
        canvasRef.current.renderAll();
    };
    const zoom = (value: number) => {
        if (!canvasRef.current) return;
        canvasRef.current.setZoom(value);
    };
    const startCrop = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageObj) return;

    setSelectMode();
    if (cropRectRef.current) {
        canvas.remove(cropRectRef.current);
        cropRectRef.current = null;
    }

    const rect = new fabric.Rect({
        left: imageObj.left,
        top: imageObj.top,
        width: imageObj.getScaledWidth() * 0.6,
        height: imageObj.getScaledHeight() * 0.6,
        fill: "rgba(0,0,0,0.2)",
        stroke: "#2563eb",
        strokeWidth: 2,
        cornerColor: "#2563eb",
        transparentCorners: false,
        hasRotatingPoint: false,
    });

    cropRectRef.current = rect;
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
};
const applyCrop = () => {
    const canvas = canvasRef.current;
    const cropRect = cropRectRef.current;

    if (!canvas || !imageObj || !cropRect) return;
    const scaleX = imageObj.scaleX ?? 1;
    const scaleY = imageObj.scaleY ?? 1;

    const cropX =
        (cropRect.left! - imageObj.left!) / scaleX;
    const cropY =
        (cropRect.top! - imageObj.top!) / scaleY;

    const cropWidth =
        (cropRect.width! * cropRect.scaleX!) / scaleX;

    const cropHeight =
        (cropRect.height! * cropRect.scaleY!) / scaleY;

    imageObj.set({
        cropX,
        cropY,
        width: cropWidth,
        height: cropHeight,
    });
    imageObj.scale(1);

    canvas.remove(cropRect);
    cropRectRef.current = null;

    canvas.renderAll();
};
const cancelCrop = () => {
    const canvas = canvasRef.current;
    if (!canvas || !cropRectRef.current) return;

    canvas.remove(cropRectRef.current);
    cropRectRef.current = null;
    canvas.renderAll();
};


    return {
        htmlCanvasRef,
        canvasRef,
        uploadImage,
        enableDrawing,
        disableDrawing,
        addRectangle,
        addCircle,
        addText,
        rotateImage,
        zoom,
        startCrop,
applyCrop,
cancelCrop,

    };
};
