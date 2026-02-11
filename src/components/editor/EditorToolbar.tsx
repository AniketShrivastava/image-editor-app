
import React from "react";
interface Props {
  onUpload: (file: File) => void;
  onCrop: () => void;
  onRotate: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onExportImage: () => void;
  onExportJSON: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  enableDrawing: () => void;
  addRectangle: () => void;
  addCircle: () => void;
  addText: () => void;
}
const EditorToolbar: React.FC<Props> = ({
  onUpload,
  onCrop,
  onRotate,
  onUndo,
  onRedo,
  onExportImage,
  onExportJSON,
  onZoomIn,
  onZoomOut,
  enableDrawing,
  addRectangle,
  addCircle,
  addText,
}) => {
  return (
    <div className="flex flex-wrap gap-2 p-3 bg-white shadow rounded-xl">
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          e.target.files && onUpload(e.target.files[0])
        }
      />

      <button onClick={enableDrawing}>✏ Pencil</button>
      <button onClick={addRectangle}>⬛ Rect</button>
      <button onClick={addCircle}>⚪ Circle</button>
      <button onClick={addText}>📝 Text</button>

      <button onClick={onCrop}>✂ Crop</button>
      <button onClick={onRotate}>🔄 Rotate</button>

      <button onClick={onUndo}>↩ Undo</button>
      <button onClick={onRedo}>↪ Redo</button>

      <button onClick={onZoomIn}>➕ Zoom</button>
      <button onClick={onZoomOut}>➖ Zoom</button>

      <button onClick={onExportImage}>📥 Export Img</button>
      <button onClick={onExportJSON}>📄 Export JSON</button>
    </div>
  );
};

export default EditorToolbar;
