
import React, { useRef } from "react";
import fabric from "fabric";
import CanvasArea from "./CanvasArea";
import EditorToolbar from "./EditorToolbar";
import { useFabricCanvas } from "../../hooks/useFabricCanvas";
import { useHistory } from "../../hooks/useHistory";

const ImageEditor = () => {
 const htmlCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvas = useFabricCanvas(htmlCanvasRef);
    const { saveState, undo, redo } = useHistory(canvas);

    const uploadImage = (file: File) => {
        if (!canvas) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const result = e.target?.result;
            if (!result || typeof result !== "string") return;

            const img = await fabric.Image.fromURL(result);

            canvas.clear();
            canvas.add(img);
            canvas.centerObject(img);
            img.set({ selectable: true });
            canvas.renderAll();
            saveState();
        };

        reader.readAsDataURL(file);
    };

    const enableDrawing = () => {
        if (!canvas) return;
        canvas.isDrawingMode = true;
    };

    const addRectangle = () => {
        if (!canvas) return;
        const rect = new fabric.Rect({
            width: 100,
            height: 80,
            fill: "transparent",
            stroke: "black",
            left: 50,
            top: 50,
        });
        canvas.add(rect);
        saveState();
    };

    const addCircle = () => {
        if (!canvas) return;
        const circle = new fabric.Circle({
            radius: 50,
            fill: "transparent",
            stroke: "black",
            left: 100,
            top: 100,
        });
        canvas.add(circle);
        saveState();
    };

    const addText = () => {
        if (!canvas) return;
        const text = new fabric.Textbox("Edit me", {
            left: 150,
            top: 150,
        });
        canvas.add(text);
        saveState();
    };

    const rotate = () => {
        if (!canvas) return;
        const obj = canvas.getActiveObject();
        if (obj) {
            obj.rotate((obj.angle || 0) + 90);
            canvas.renderAll();
            saveState();
        }
    };

    const zoomIn = () => {
        if (!canvas) return;
        canvas.setZoom(canvas.getZoom() + 0.1);
    };

    const zoomOut = () => {
        if (!canvas) return;
        canvas.setZoom(canvas.getZoom() - 0.1);
    };

    const exportImage = () => {
        if (!canvas) return;
        const dataURL = canvas.toDataURL();
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "edited.png";
        link.click();
    };

    const exportJSON = () => {
        if (!canvas) return;
        const json = JSON.stringify(canvas.toJSON());
        const blob = new Blob([json], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "editor-data.json";
        link.click();
    };

    return (
        <div className="w-full min-h-screen flex flex-col gap-4 p-4 bg-gray-100">
            <EditorToolbar
                onUpload={uploadImage}
                onCrop={() => { }}
                onRotate={rotate}
                onUndo={undo}
                onRedo={redo}
                onExportImage={exportImage}
                onExportJSON={exportJSON}
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
                enableDrawing={enableDrawing}
                addRectangle={addRectangle}
                addCircle={addCircle}
                addText={addText}
            />

            <div className="flex-1">
                <CanvasArea canvasRef={htmlCanvasRef} />
            </div>
        </div>
    );
};

export default ImageEditor;
