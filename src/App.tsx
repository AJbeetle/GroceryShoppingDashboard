import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DesignSheet from './layouts/devDesignSheet'

import {Like, Cart, Offers, Inventory} from "./store/loaclStorage"
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

function App() {

  async function callDB(){
    const res = await axios.get(`${BASE_URL}/?category=all`);
    const data = await res.data;
    return data;
  }

  localStorage.setItem("Offers",JSON.stringify(Offers));
  localStorage.setItem("Like",JSON.stringify(Like));
  localStorage.setItem("Cart",JSON.stringify(Cart));
  localStorage.setItem("Inventory",JSON.stringify(Inventory));

  useEffect(function(){
    console.log("Setting localStorage");
    try{
      localStorage.setItem("Offers",JSON.stringify(Offers));
      localStorage.setItem("Like",JSON.stringify(Like));
      localStorage.setItem("Cart",JSON.stringify(Cart));
      localStorage.setItem("Inventory",JSON.stringify(Inventory));
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
      });

    }
    catch(E){
      console.log(E);
    }

    return function(){
      localStorage.clear();
    }
  },[])

  return (
    <div className="px-20 py-20">
      <DesignSheet></DesignSheet>
    </div>
  )
}

export default App
