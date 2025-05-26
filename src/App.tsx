import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DesignSheet from './layouts/devDesignSheet'

import {Like, Cart, Offers} from "./store/loaclStorage"

localStorage.setItem("Offers",JSON.stringify(Offers));
localStorage.setItem("Like",JSON.stringify(Like));
localStorage.setItem("Cart",JSON.stringify(Cart));

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <DesignSheet></DesignSheet>
    </div>
  )
}

export default App
