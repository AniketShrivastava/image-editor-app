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

    const { saveState, undo, redo } = useHistory(canvasRef.current);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col p-4 gap-4">
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

            <div className="flex-1 bg-white rounded-xl shadow overflow-hidden">
                <canvas ref={htmlCanvasRef} />
            </div>

            <div className="flex gap-4">
                <button onClick={() => exportImage(canvasRef.current)}>
                    Export Image
                </button>
                <button onClick={() => exportJSON(canvasRef.current)}>
                    Export JSON
                </button>
            </div>
        </div>
    );
};

export default ImageEditor;
