import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UIProvider } from './DrawerContext.jsx'
import "./index.css"
import { CanvasProvider } from './builder/layout-engine/utils/contexts/CanvasContexdt.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UIProvider>
      <CanvasProvider>
        <App />
      </CanvasProvider>
    </UIProvider>
  </StrictMode>,
)
