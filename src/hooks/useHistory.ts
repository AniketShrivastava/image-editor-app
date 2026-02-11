// components/editor/hooks/useHistory.ts

import { useRef } from "react";
import fabric  from "fabric";

export const useHistory = (canvas: fabric.Canvas | null) => {
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);

  const saveState = () => {
    if (!canvas) return;
    undoStack.current.push(JSON.stringify(canvas.toJSON()));
    redoStack.current = [];
  };

  const undo = () => {
    if (!canvas || undoStack.current.length < 2) return;

    redoStack.current.push(undoStack.current.pop()!);
    const prevState = undoStack.current[undoStack.current.length - 1];

    canvas.loadFromJSON(prevState, () => canvas.renderAll());
  };

  const redo = () => {
    if (!canvas || redoStack.current.length === 0) return;

    const state = redoStack.current.pop()!;
    undoStack.current.push(state);

    canvas.loadFromJSON(state, () => canvas.renderAll());
  };

  return { saveState, undo, redo };
};
