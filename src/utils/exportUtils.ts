export const exportImage = (canvas: any) => {
    const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "edited-image.png";
    link.click();
};

export const exportJSON = (canvas: any) => {
    const json = JSON.stringify(canvas.toJSON());
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "canvas-data.json";
    link.click();
};
