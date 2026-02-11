import { useEffect, useRef } from 'react'
import { Canvas } from 'fabric'

export const useHistory = (canvas: Canvas | null) => {
  const history = useRef<string[]>([])
  const redoStack = useRef<string[]>([])
  const isRestoring = useRef(false)
  const getState = () => JSON.stringify(canvas?.toJSON())
  const saveState = () => {
    if (!canvas || isRestoring.current) return
    const json = getState()
    if (!json) return
    const last = history.current[history.current.length - 1]
    if (last === json) return
    history.current.push(json)
    redoStack.current = []
  }
  const initHistory = () => {
    if (!canvas) return
    history.current = [getState()!]
    redoStack.current = []
  }
  const undo = async () => {
    if (!canvas || history.current.length <= 1) return
    isRestoring.current = true
    const current = history.current.pop()
    if (current) redoStack.current.push(current)
    const previous = history.current[history.current.length - 1]
    if (!previous) return
    await canvas.loadFromJSON(previous)
    canvas.renderAll()
    isRestoring.current = false
  }
  const redo = async () => {
    if (!canvas || redoStack.current.length === 0) return
    isRestoring.current = true
    const state = redoStack.current.pop()
    if (!state) return
    history.current.push(state)
    await canvas.loadFromJSON(state)
    canvas.renderAll()
    isRestoring.current = false
  }
  useEffect(() => {
    if (!canvas) return
    const events = [
      'object:added',
      'object:modified',
      'object:removed',
      'path:created',
    ]
    events.forEach((event:any) =>
      canvas.on(event, saveState)
    )
    return () => {
      events.forEach((event:any) =>
        canvas.off(event, saveState)
      )
    }
  }, [canvas])

  return { undo, redo, initHistory }
}
