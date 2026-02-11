import { useFabricCanvas } from "../../hooks/useFabricCanvas";
import { useHistory } from "../../hooks/useHistory";
import { Toolbar } from "../editor/EditorToolbar";
import { exportImage, exportJSON } from "../../utils/exportUtils";
import "./ImageEditor.css";

const ImageEditor = () => {
    const {
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
    } = useFabricCanvas();

    const {  undo, redo } = useHistory(canvasRef.current);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">

            <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <Toolbar
                        uploadImage={uploadImage}
                        enableDrawing={enableDrawing}
                        disableDrawing={disableDrawing}
                        addRectangle={addRectangle}
                        addCircle={addCircle}
                        addText={addText}
                        rotateImage={rotateImage}
                        undo={undo}
                        redo={redo}
                        zoom={zoom}
                    />
                </div>
            </div>

        
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">

                <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden">

                  
                    <div className="flex-1 relative bg-gray-50 flex items-center justify-center p-4">
                        <canvas
                            ref={htmlCanvasRef}
                            className="max-w-full max-h-[70vh] rounded-lg border border-gray-300 shadow-sm"
                        />
                    </div>

                    <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 flex flex-col sm:flex-row gap-3 sm:justify-between">

                        <div className="text-sm text-gray-500">
                            Image Editor • Fabric.js
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => exportImage(canvasRef.current)}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                            >
                                Export Image
                            </button>

                            <button
                                onClick={() => exportJSON(canvasRef.current)}
                                className="px-4 py-2 rounded-lg bg-gray-800 text-white text-sm font-medium hover:bg-gray-900 transition"
                            >
                                Export JSON
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    );
};

export default ImageEditor;
