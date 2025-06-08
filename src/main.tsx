import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {RecoilRoot} from "recoil"
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter basename="/">
    <RecoilRoot>
      <div className="font-almarai text-black-text bg-white-default">
        <App />
      </div> 
    </RecoilRoot>
  </BrowserRouter>
  </StrictMode>,
)
