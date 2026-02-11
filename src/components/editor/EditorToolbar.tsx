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
        <div className="w-full bg-white shadow-lg rounded-2xl p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                {/* LEFT SIDE */}
                <div className="flex flex-wrap items-center gap-3">

                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-lg text-sm font-medium">
                        Upload Image
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                                e.target.files && props.uploadImage(e.target.files[0])
                            }
                        />
                    </label>

                    <button
                        className="toolbar-btn bg-green-500"
                        onClick={props.enableDrawing}
                    >
                        ✏ Pencil
                    </button>

                    <button
                        className="toolbar-btn bg-gray-600"
                        onClick={props.disableDrawing}
                    >
                        🖱 Select
                    </button>

                    <button
                        className="toolbar-btn bg-purple-500"
                        onClick={props.addRectangle}
                    >
                        ▭ Rect
                    </button>

                    <button
                        className="toolbar-btn bg-pink-500"
                        onClick={props.addCircle}
                    >
                        ◯ Circle
                    </button>

                    <button
                        className="toolbar-btn bg-yellow-500 text-black"
                        onClick={props.addText}
                    >
                        T Text
                    </button>

                    <button
                        className="toolbar-btn bg-indigo-500"
                        onClick={props.rotateImage}
                    >
                        ↻ Rotate
                    </button>

                    <button
                        className="toolbar-btn bg-blue-500"
                        onClick={props.undo}
                    >
                        Undo
                    </button>

                    <button
                        className="toolbar-btn bg-blue-700"
                        onClick={props.redo}
                    >
                        Redo
                    </button>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl shadow-inner">
                    <span className="text-sm font-medium">Zoom</span>
                    <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        defaultValue="1"
                        className="w-40 accent-blue-600"
                        onChange={(e) => props.zoom(Number(e.target.value))}
                    />
                </div>

            </div>
        </div>


    );
};
