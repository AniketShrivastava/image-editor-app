Image Editor App

A modular image editor built using React + TypeScript + Fabric.js + TailwindCSS (CRA).

Supports drawing tools, shapes, text annotations, crop, undo/redo, zoom, and export.

------------------------------------ Folder Structure
image-editor-app/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   └── editor/
│   │       ├── CanvasArea.tsx        # Canvas wrapper UI
│   │       ├── EditorToolbar.tsx     # Toolbar layout
│   │       ├── ToolbarButtons.tsx    # Reusable button component
│   │       ├── ImageEditor.tsx       # Main editor container
│   │       └── ImageEditor.css
│   │
│   ├── hooks/
│   │   ├── useFabricCanvas.ts        # Fabric canvas logic
│   │   └── useHistory.ts             # Undo / Redo logic
│   │
│   ├── utils/
│   │   └── exportUtils.ts            # Export image & JSON
│   │
│   ├── index.tsx
│   ├── index.css
│   ├── App.tsx
│   └── App.css
│
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
------------------------------------------- Architecture Overview
components/editor/

UI Layer only.
No Fabric business logic inside.

ImageEditor.tsx

Combines canvas + toolbar

Connects hooks to UI

EditorToolbar.tsx

Toolbar layout

Uses reusable buttons

ToolbarButtons.tsx

Reusable styled button component

CanvasArea.tsx

Responsible only for canvas container styling

=================================================== hooks/

Business logic layer.

useFabricCanvas.ts

Handles:

Canvas initialization

Resize handling

Upload image

Drawing mode

Shapes

Text

Rotate

Crop

Zoom

No Fabric objects stored in React state.

useHistory.ts

Handles:

Snapshot-based history

Undo

Redo

Event listeners

Prevent duplicate states

--------------------------------------- utils/

Utility helpers.

exportUtils.ts

Export as PNG

Export as JSON

---------------------------------------- Setup
Install
npm install

Run
npm start

----------------------------------- Tailwind Setup (CRA)
tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}

postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

------------------------------------Features

Upload image

Free drawing

Rectangle / Circle

Text annotation

Rotate selected object

Crop image

Undo / Redo

Zoom

Export PNG

Export JSON

Responsive layout