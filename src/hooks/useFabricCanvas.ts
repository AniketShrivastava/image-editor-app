import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

export const useFabricCanvas = () => {
    const canvasRef = useRef<fabric.Canvas | null>(null);
    const htmlCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [imageObj, setImageObj] = useState<fabric.Image | null>(null);
    useEffect(() => {
        if (!htmlCanvasRef.current) return;

        const canvas = new fabric.Canvas(htmlCanvasRef.current, {
            width: 900,
            height: 600,
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

            try {
                const img = await fabric.Image.fromURL(result);

                // Safety check for width/height
                const imgWidth = img.width ?? 1;
                const imgHeight = img.height ?? 1;

                const canvasWidth = canvas.getWidth();
                const canvasHeight = canvas.getHeight();

                // Fit inside canvas
                const scale = Math.min(
                    canvasWidth / imgWidth,
                    canvasHeight / imgHeight
                );

                img.scale(scale);


                img.set({
                    left: (canvasWidth - img.getScaledWidth()) / 2,
                    top: (canvasHeight - img.getScaledHeight()) / 2,

                });

                canvas.clear();
                canvas.add(img);
                canvas.sendObjectToBack(img);
                canvas.renderAll();

                setImageObj(img);
            } catch (error) {
                console.error("Image load error:", error);
            }
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
    };
};
