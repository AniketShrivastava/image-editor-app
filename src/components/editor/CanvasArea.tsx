import React from "react";

type CanvasAreaProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

const CanvasArea: React.FC<CanvasAreaProps> = ({ canvasRef }) => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-100 overflow-auto">
      <canvas
        ref={canvasRef}
        className="border shadow-lg bg-white"
        width={1000}
        height={600}
      />
    </div>
  );
};

export default CanvasArea;
