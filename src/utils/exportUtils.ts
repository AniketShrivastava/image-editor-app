import  fabric  from "fabric";

export const exportImage = (canvas: fabric.Canvas) => {
  const dataURL = canvas.toDataURL({
    format: "png",
    multiplier: 2,
  });

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "edited-image.png";
  link.click();
};

export const exportJSON = (canvas: fabric.Canvas) => {
  const json = canvas.toJSON();
  const blob = new Blob([JSON.stringify(json)], {
    type: "application/json",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "annotations.json";
  link.click();
};
