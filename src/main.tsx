import { StrictMode } from 'react' 
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {RecoilRoot} from "recoil"
import { BrowserRouter } from 'react-router-dom'

import {Like, Cart, Offers, Inventory, Free} from "./store/loaclStorage"

if(!localStorage.getItem("Initialised")){
  localStorage.setItem("Offers",JSON.stringify(Offers));
  localStorage.setItem("Like",JSON.stringify(Like));
  localStorage.setItem("Cart",JSON.stringify(Cart));
  localStorage.setItem("Free",JSON.stringify(Free));
  localStorage.setItem("Inventory",JSON.stringify(Inventory));
}

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
