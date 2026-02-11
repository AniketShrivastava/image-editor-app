import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import "./ImageEditor.css";

const ImageEditor = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const htmlCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [zoomLevel, setZoomLevel] = useState(1);
  const cropRectRef = useRef<fabric.Rect | null>(null);
  const isCroppingRef = useRef(false);

  // =======================
  // Canvas Init
  // =======================
  useEffect(() => {
    if (!htmlCanvasRef.current) return;

    const canvas = new fabric.Canvas(htmlCanvasRef.current, {
      width: 900,
      height: 520,
      backgroundColor: "#ffffff",
      preserveObjectStacking: true,
    });

    canvasRef.current = canvas;

    return () => {
      void canvas.dispose();
      canvasRef.current = null;
    };
  }, []);

  // =======================
  // Image Upload
  // =======================
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvasRef.current) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const img = await fabric.Image.fromURL(reader.result as string);

      img.scaleToWidth(500);
      img.set({ left: 200, top: 100 });

      canvasRef.current!.add(img);
      canvasRef.current!.setActiveObject(img);
    };
    reader.readAsDataURL(file);
  };

  // =======================
  // Add Text
  // =======================
  const addText = () => {
    if (!canvasRef.current) return;

    const text = new fabric.Textbox("Double click to edit", {
      left: 250,
      top: 80,
      fontSize: 28,
      fill: "#111",
    });

    canvasRef.current.add(text);
    canvasRef.current.setActiveObject(text);
  };

  // =======================
  // Zoom Controls
  // =======================
  const zoom = (factor: number) => {
    if (!canvasRef.current) return;

    const newZoom = zoomLevel * factor;
    setZoomLevel(newZoom);

    canvasRef.current.setZoom(newZoom);
  };

  const resetZoom = () => {
    if (!canvasRef.current) return;

    setZoomLevel(1);
    canvasRef.current.setZoom(1);
  };

  // =======================
  // Delete Selected
  // =======================
  const deleteSelected = () => {
    if (!canvasRef.current) return;

    const obj = canvasRef.current.getActiveObject();
    if (obj) {
      canvasRef.current.remove(obj);
    }
  };

  // =======================
  // Crop Tool
  // =======================
  const startCrop = () => {
    if (!canvasRef.current) return;

    isCroppingRef.current = true;

    const rect = new fabric.Rect({
      left: 150,
      top: 100,
      width: 300,
      height: 200,
      fill: "rgba(0,0,0,0.2)",
      stroke: "#007bff",
      strokeDashArray: [6],
      selectable: true,
    });

    cropRectRef.current = rect;
    canvasRef.current.add(rect);
    canvasRef.current.setActiveObject(rect);
  };

  const applyCrop = () => {
    if (!canvasRef.current || !cropRectRef.current) return;

    const canvas = canvasRef.current;
    const cropRect = cropRectRef.current;

    const activeImg = canvas
      .getObjects()
      .find((obj) => obj.type === "image") as fabric.Image;

    if (!activeImg) return;

    const { left, top, width, height } = cropRect.getBoundingRect();

    const cropped = new fabric.Image(activeImg.getElement(), {
      left: activeImg.left,
      top: activeImg.top,
      cropX: left - activeImg.left!,
      cropY: top - activeImg.top!,
      width,
      height,
      scaleX: activeImg.scaleX,
      scaleY: activeImg.scaleY,
    });

    canvas.remove(activeImg);
    canvas.remove(cropRect);
    cropRectRef.current = null;

    canvas.add(cropped);
    canvas.setActiveObject(cropped);
  };

  // =======================
  // Download
  // =======================
  const downloadImage = () => {
    if (!canvasRef.current) return;

    const dataURL = canvasRef.current.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 1,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "image-editor.png";
    link.click();
  };

  return (
    <div className="editor-wrapper">
      {/* Toolbar */}
      <div className="toolbar">
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <button onClick={addText}>Text</button>
        <button onClick={startCrop}>Crop</button>
        <button onClick={applyCrop}>Apply Crop</button>
        <button onClick={deleteSelected}>Delete</button>

        <button onClick={() => zoom(1.1)}>Zoom +</button>
        <button onClick={() => zoom(0.9)}>Zoom -</button>
        <button onClick={resetZoom}>Reset</button>

        <button className="primary" onClick={downloadImage}>
          Download
        </button>
      </div>

      {/* Canvas */}
      <div className="canvas-container">
        <canvas ref={htmlCanvasRef} />
      </div>
    </div>
  );
};

export default ImageEditor;
