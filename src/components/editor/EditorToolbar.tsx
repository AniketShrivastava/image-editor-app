import { ToolbarButton } from "./ToolBarButtons";

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
    startCrop: () => void
    applyCrop: () => void
    cancelCrop: () => void
}
export const Toolbar = (props: Props) => {
    return (
        <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                    <label className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium shadow-sm transition">
                            Upload
                        <input
                            type="file"
                            className=""
                            onChange={(e) =>
                                e.target.files && props.uploadImage(e.target.files[0])
                            }
                        />
                        </div>
                    </label>

                    <ToolbarButton
                        label="Pencil"
                        variant="success"
                        onClick={props.enableDrawing}
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                            </svg>
                        }
                    />

                    <ToolbarButton
                        label="Select"
                        variant="dark"
                        onClick={props.disableDrawing}
                        icon={
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4 4l16 8-6 2 2 6-4 2-2-6-6 2z" />
                            </svg>
                        }
                    />

                    <ToolbarButton
                        label="Rect"
                        onClick={props.addRectangle}
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="6" width="18" height="12" rx="2" />
                            </svg>
                        }
                    />

                    <ToolbarButton
                        label="Circle"
                        onClick={props.addCircle}
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="9" />
                            </svg>
                        }
                    />

                    <ToolbarButton
                        label="Text"
                        variant="warning"
                        onClick={props.addText}
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 6h16M12 6v12" />
                            </svg>
                        }
                    />

                    <ToolbarButton
                        label="Rotate"
                        onClick={props.rotateImage}
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4v6h6" />
                                <path d="M20 20v-6h-6" />
                            </svg>
                        }
                    />

                    <ToolbarButton
                        label="Undo"
                        onClick={props.undo}
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 14L4 9l5-5" />
                                <path d="M20 20a9 9 0 00-9-9H4" />
                            </svg>
                        }
                    />

                    <ToolbarButton
                        label="Redo"
                        onClick={props.redo}
                        icon={
                            <svg className="rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 14L4 9l5-5" />
                                <path d="M20 20a9 9 0 00-9-9H4" />
                            </svg>
                        }
                    />

                    <ToolbarButton
                        label="Crop"
                        variant="danger"
                        onClick={props.startCrop}
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 2v14a2 2 0 002 2h14" />
                                <path d="M18 22V8a2 2 0 00-2-2H2" />
                            </svg>
                        }
                    />

                    <ToolbarButton
                        label="Apply"
                        variant="success"
                        onClick={props.applyCrop}
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                        }
                    />

                    <ToolbarButton
                        label="Cancel"
                        variant="dark"
                        onClick={props.cancelCrop}
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M6 6l12 12M6 18L18 6" />
                            </svg>
                        }
                    />

                </div>
                <div className="flex items-center gap-4 bg-gray-50 px-4 py-3 rounded-lg shadow-inner w-full xl:w-auto">
                    <span className="text-sm font-medium text-gray-600">
                        Zoom
                    </span>

                    <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        defaultValue="1"
                        className="w-full xl:w-40 accent-blue-600"
                        onChange={(e) => props.zoom(Number(e.target.value))}
                    />
                </div>

            </div>
        </div>



    );
};
