import {useEffect} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import DesignSheet from './layouts/devDesignSheet'
import { Routes, Route} from "react-router-dom"

import {Like, Cart, Offers, Inventory, Free, InvDetails} from "./store/loaclStorage"
import axios from 'axios'
import Dashboard from './layouts/Dashboard'
import CartPage from './layouts/Checkout'
import ErrorPage from './layouts/ErrorPage'

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

function App() {

  async function callDB(){
    const res = await axios.get(`${BASE_URL}/?category=all`);
    const data = await res.data;
    return data;
  }

  
  // localStorage.setItem("Offers",JSON.stringify(Offers));
  // localStorage.setItem("Like",JSON.stringify(Like));
  // localStorage.setItem("Cart",JSON.stringify(Cart));
  // localStorage.setItem("Free",JSON.stringify(Free));
  // localStorage.setItem("Inventory",JSON.stringify(Inventory));

  useEffect(function(){
    console.log("Setting localStorage");
    if(!localStorage.getItem("Initialised")){
      try{
        localStorage.clear();
        localStorage.setItem("Offers",JSON.stringify(Offers));
        localStorage.setItem("Like",JSON.stringify(Like));
        localStorage.setItem("Cart",JSON.stringify(Cart));
        localStorage.setItem("Free",JSON.stringify(Free)); //I am assuming whatever Items are offered free, are not part of main inventory a different stock is maintained for them, so whenevr an item is added or removed from Free its quantity will not be reduced/increased from inventory
        localStorage.setItem("Inventory",JSON.stringify(Inventory));
        localStorage.setItem("InvDetails",JSON.stringify(InvDetails));
        
        callDB().then(res=>{
          // const inventoryObj:Record<string, number> = {};
          for(let i=0; i<res.length;i++){
            const cartItems = JSON.parse(localStorage.getItem("Cart") as string)["items"];
            if(cartItems[res[i].name]){
              Inventory[`${res[i].name}`] = res[i].available - cartItems[res[i].name]
            }
            else{
              Inventory[`${res[i].name}`] = res[i].available
            }
          }
          // console.log(Inventory)
          localStorage.setItem("Inventory",JSON.stringify(Inventory))
          localStorage.setItem("Initialised", "true");
        });
  
      }
      catch(E){
        console.log(E);
      }
    }

    // return function(){
    //   localStorage.clear();
    // }
  },[])
  

  return (
    <div className="px-20 py-20">
      <Routes>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>
          <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </div>
  )
}

export default App
