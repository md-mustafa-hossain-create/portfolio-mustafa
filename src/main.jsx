import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.jsx'
import ErrorBoundary from '@/components/ui/ErrorBoundary.jsx'
import { applyTheme, getPreferredTheme } from '@/theme'

applyTheme(getPreferredTheme())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
