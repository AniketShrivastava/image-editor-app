import { useRef } from "react";
import  fabric  from "fabric";

export const useHistory = (canvas: fabric.Canvas | null) => {
  const history = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);
  const isRestoring = useRef(false);

  // Save current canvas state
  const saveState = () => {
    if (!canvas || isRestoring.current) return;

    const json = JSON.stringify(canvas.toJSON());

    // Avoid duplicate state push
    if (history.current.length > 0 && history.current[history.current.length - 1] === json) {
      return;
    }

    history.current.push(json);
    redoStack.current = [];
  };

  // Initialize first state (IMPORTANT)
  const initHistory = () => {
    if (!canvas) return;
    history.current = [JSON.stringify(canvas.toJSON())];
    redoStack.current = [];
  };

  const undo = () => {
    if (!canvas || history.current.length <= 1) return;

    isRestoring.current = true;

    const currentState = history.current.pop();
    if (currentState) {
      redoStack.current.push(currentState);
    }

    const previousState = history.current[history.current.length - 1];

    canvas.loadFromJSON(previousState, () => {
      canvas.renderAll();
      isRestoring.current = false;
    });
  };

  const redo = () => {
    if (!canvas || redoStack.current.length === 0) return;

    isRestoring.current = true;

    const state = redoStack.current.pop();
    if (!state) return;

    history.current.push(state);

    canvas.loadFromJSON(state, () => {
      canvas.renderAll();
      isRestoring.current = false;
    });
  };

  return { saveState, undo, redo, initHistory };
};
