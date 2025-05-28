import type { CartObjType } from "../../store/loaclStorage"
import {useRecoilValue, useSetRecoilState} from "recoil"
import { cartCardSelector } from "../../store/atoms and selectors/items";
import type { cartCardItems } from "../../types/interfaces/items";
import { AddIcon, MinusIcon, RemoveIcon } from "../icons/cartFunc";
import { cartCountAtom } from "../../store/atoms and selectors/cart";

import {useState} from "react"

function CartItemCard({cartItem, setReRender}: {
    cartItem : CartObjType,
    setReRender: React.Dispatch<React.SetStateAction<boolean>>
}){
    const cartObj = JSON.parse(localStorage.getItem("Cart") as string);
    const invObj = JSON.parse(localStorage.getItem("Inventory") as string);
    const allItems = useRecoilValue(cartCardSelector);
    const setCartCount = useSetRecoilState(cartCountAtom);
    const [itemAvailability, setItemAvailability] = useState(0);

    function addToCART(elm : cartCardItems){
        // update cartCountAtom
        // update localStorage cartObj
        // update localStorag invObj
        // disable add button if inventory goes to 0 after person adding it to cart


        const cartObj = JSON.parse(localStorage.getItem("Cart") as string);

        cartObj.items[elm.name]++;
        cartObj.count++;
        localStorage.setItem("Cart",JSON.stringify(cartObj));
        //@ts-ignore
        setCartCount(t=>t+1);

        // following whole is redundant code
        // if(cartObj.items[elm.name]){
        //     cartObj.items[elm.name]++;
        //     cartObj.count++;
        //     localStorage.setItem("Cart",JSON.stringify(cartObj));
        //     //@ts-ignore
        //     setCartCount(t=>t+1);
        // }
        // else{
        //     cartObj.items[elm.name] = 1;
        //     cartObj.count++;
        //     localStorage.setItem("Cart",JSON.stringify(cartObj));
        //     //@ts-ignore
        //     setCartCount(t=>t+1);
            
        // }

        const invObj = JSON.parse(localStorage.getItem("Inventory") as string);
        invObj[`${elm.name}`] = invObj[`${elm.name}`] - 1 ;
        localStorage.setItem("Inventory",JSON.stringify(invObj));
        

        setItemAvailability(t => t-1);

    }
    
    function minusFromCART(elm : cartCardItems){
        // update cartCountAtom
        // update localStorage cartObj
        // update localStorag invObj
        // disable add button if inventory goes to 0 after person adding it to cart


        const cartObj = JSON.parse(localStorage.getItem("Cart") as string);

        cartObj.items[elm.name]--;
        cartObj.count--;
        localStorage.setItem("Cart",JSON.stringify(cartObj));
        //@ts-ignore
        setCartCount(t=>t-1);

        const invObj = JSON.parse(localStorage.getItem("Inventory") as string);
        invObj[`${elm.name}`] = invObj[`${elm.name}`] + 1 ;
        localStorage.setItem("Inventory",JSON.stringify(invObj));
        

        setItemAvailability(t => t+1);
    }

    function removeFromCART(elm : cartCardItems){
        // update localStorage cartObj
        // update cartCountAtom
        // update localStorag invObj
        // re renders whole cartView, because an element is gonna get removed from cartObj : MAYBE NOT NEEDED
        
        const cartObj = JSON.parse(localStorage.getItem("Cart") as string);
        const item_count = cartObj.items[elm.name];
        cartObj["count"] = cartObj["count"]-item_count;
        delete cartObj.items[elm.name]
        localStorage.setItem("Cart",JSON.stringify(cartObj));

        // @ts-ignore
        setCartCount(t=> t-item_count);
        
        const invObj = JSON.parse(localStorage.getItem("Inventory") as string);
        invObj[elm.name] = invObj[elm.name] + item_count
        localStorage.setItem("Inventory",JSON.stringify(invObj));

        setReRender(t=>!t);
    }

    return (
        <div>
            {/* Content Extraction */}
            {
                Object.keys(cartItem.items).map((el:string,i:number)=>{
                    const element = allItems.find(e => e.name == el) as cartCardItems;
                    // const pr = (parseFloat((element.price).split("£")[1])*cartItem.items[el]).toFixed(2);
                    // console.log(pr);
                    // setItemAvailability(invObj[el]);    //it trigerrs inifinite renders 
                    return (
                        <div className="flex gap-10 text-white-default m-1 bg-pink-300 p-2 w-[80%]" key={el}>
                            <p className="bg-red-900 p-1">
                                {el} - {element.name} -  {`P${element.id}`} - {element.price} - {element.img ? `${element.img}` : null}
                            </p>
                            <div className="bg-pink-700 p-1">
                                Quant : 
                                {
                                    cartItem.items[el]
                                }
                            </div>
                            <div className="bg-blue-600">
                                
                                {
                                    invObj[el] <= 10 ? (invObj[el] == 0 ? `No More after this order` : `Left in Stock : ${invObj[el]}` ): null
                                    // itemAvailability <= 10 ? (itemAvailability == 0 ? `No More after this order` : `Left in Stock : ${itemAvailability}` ): null  //triggers infinite renders
                                }
                            </div>   
                            <div className="bg-green-600 p-1">
                                Price : {(parseFloat((element.price).split("£")[1])*cartItem.items[el]).toFixed(2)}
                                {/* Price : {pr} */}
                            </div>    
                            <div className="flex gap-2 ">
                                <button className="active:scale-90 disabled:scale-100 disabled:cursor-not-allowed" onClick={()=>addToCART(element)} disabled={invObj[el]===0?true:false}> 
                                    <AddIcon/>
                                </button>
                                <button className="active:scale-90 disabled:scale-100 disabled:cursor-not-allowed" onClick={()=>minusFromCART(element)} disabled={cartObj.items[el]===0?true:false}>
                                    <MinusIcon/>
                                </button>
                                <button className="active:scale-90 disabled:scale-100 disabled:cursor-not-allowed" onClick={()=>removeFromCART(element)} disabled={false}>
                                    <RemoveIcon/>
                                </button>
                            </div>   
                        </div>
                    )
                })
            }
        </div>    
    )
}

export default CartItemCard