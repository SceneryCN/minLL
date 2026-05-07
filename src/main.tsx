import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/variables.css'
import './index.css'
import { SITE_BACKGROUND_IMAGE_SRC } from '@/constants/assets'
import App from './App.tsx'

document.documentElement.style.setProperty(
  '--site-bg-photo',
  `url("${SITE_BACKGROUND_IMAGE_SRC}")`
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
