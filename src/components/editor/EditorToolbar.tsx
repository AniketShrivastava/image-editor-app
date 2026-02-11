interface Props {
  uploadImage: (file: File) => void;
  enableDrawing: () => void;
  disableDrawing: () => void;
  addRectangle: () => void;
  addCircle: () => void;
  addText: () => void;
  rotateImage: () => void;
  undo: () => void;
  redo: () => void;
  zoom: (value: number) => void;
}

export const Toolbar = (props: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-white shadow-md rounded-xl">

      <input
        type="file"
        className="border p-2 rounded"
        onChange={(e) =>
          e.target.files && props.uploadImage(e.target.files[0])
        }
      />

      <button
        className="px-3 py-1 bg-green-500 text-white rounded"
        onClick={props.enableDrawing}
      >
        Pencil
      </button>

      <button
        className="px-3 py-1 bg-gray-500 text-white rounded"
        onClick={props.disableDrawing}
      >
        Select
      </button>

      <button
        className="px-3 py-1 bg-purple-500 text-white rounded"
        onClick={props.addRectangle}
      >
        Rect
      </button>

      <button
        className="px-3 py-1 bg-pink-500 text-white rounded"
        onClick={props.addCircle}
      >
        Circle
      </button>

      <button
        className="px-3 py-1 bg-yellow-500 text-white rounded"
        onClick={props.addText}
      >
        Text
      </button>

      <button
        className="px-3 py-1 bg-indigo-500 text-white rounded"
        onClick={props.rotateImage}
      >
        Rotate
      </button>

      <button
        className="px-3 py-1 bg-blue-500 text-white rounded"
        onClick={props.undo}
      >
        Undo
      </button>

      <button
        className="px-3 py-1 bg-blue-700 text-white rounded"
        onClick={props.redo}
      >
        Redo
      </button>

      <div className="flex items-center gap-2">
        <span>Zoom</span>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          defaultValue="1"
          onChange={(e) => props.zoom(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
