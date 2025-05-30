import type { CartObjType } from "../../store/loaclStorage"
import {useRecoilValue, useSetRecoilState} from "recoil"
import { cartCardSelector } from "../../store/atoms and selectors/items";
import type { cartCardItems } from "../../types/interfaces/items";
import { AddIcon, MinusIcon, RemoveIcon } from "../icons/cartFunc";
import { cartCountAtom } from "../../store/atoms and selectors/cart";

import {useState, useEffect} from "react"

function CartItemCard({cartItem, setReRender}: {
    cartItem : CartObjType,
    setReRender: React.Dispatch<React.SetStateAction<boolean>>
}){
    const cartObj = JSON.parse(localStorage.getItem("Cart") as string);
    const invObj = JSON.parse(localStorage.getItem("Inventory") as string);
    const allItems = useRecoilValue(cartCardSelector);
    const setCartCount = useSetRecoilState(cartCountAtom);
    const cartCount = useRecoilValue(cartCountAtom);
    const [itemAvailability, setItemAvailability] = useState(0);
    const [total, setTotal] = useState(0);

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

        if(cartObj.items[elm.name] == 1){
            removeFromCART(elm);
            return; 
        }

        // const cartObj = JSON.parse(localStorage.getItem("Cart") as string);

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

    function SetTOTAL(){
        setTotal(0);
        const cartObj = JSON.parse(localStorage.getItem("Cart") as string);
        Object.keys(cartObj.items).map((el:string) => {
            const element = allItems.find(e=>e.name == el) as cartCardItems;
            const total = (parseFloat((element.price).split("£")[1])*cartItem.items[el]);
            setTotal(t => t+total);
        })
    }

    useEffect(function(){
        SetTOTAL();
    },[cartCount])

    return (
        <>
        <div className="flex flex-col gap-8">
            {/* Content Extraction */}
            {
                Object.keys(cartItem.items).map((el:string,i:number)=>{
                    const element = allItems.find(e => e.name == el) as cartCardItems;
                    // const pr = (parseInt((element.price).split("£")[1])*cartItem.items[el]);
                    // console.log(pr);
                    // setItemAvailability(invObj[el]);    //it trigerrs inifinite renders 
                    return (
                        <div className="flex m-1 bg-white-default shadow-lg p-6 rounded-3xl w-[70%] justify-between" key={el}>
                            {/* Image and Name */}
                            <div className="flex w-[40%] gap-6 ">
                                <div>
                                    <img src={`${element.img}`} className="w-[80px] h-[80px] rounded-lg"></img>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <p className="font-bold text-xl">{element.name}</p>
                                    <p>Product Code : {`P${element.id}`}</p>
                                </div>
                            </div>

                            {/* Other Functionalities */}
                            <div className="flex justify-between w-[60%]  items-start">
                                <div className="flex flex-col w-full gap-2">
                                    <div className="flex justify-center items-center w-full ">
                                        <div className="flex gap-4 w-[70%] justify-center">
                                            <button className="active:scale-90 disabled:scale-100 disabled:cursor-not-allowed" onClick={()=>minusFromCART(element)} disabled={cartObj.items[el]===0?true:false}>
                                                <MinusIcon/>
                                            </button>
                                            <p className="text-xl">
                                                {
                                                    cartItem.items[el]
                                                }
                                            </p>
                                            <button className="active:scale-90 disabled:scale-100 disabled:cursor-not-allowed" onClick={()=>addToCART(element)} disabled={invObj[el]===0?true:false}> 
                                                <AddIcon/>
                                            </button>
                                        </div>

                                        <div className="flex justify-end items-center  gap-14 w-[30%]  ">
                                            <div>
                                                £{(parseFloat((element.price).split("£")[1])*cartItem.items[el]).toFixed(2)}
                                            </div>

                                            <div className="justify-center items-center flex">
                                                <button className="active:scale-90 disabled:scale-100 disabled:cursor-not-allowed" onClick={()=>removeFromCART(element)} disabled={false}>
                                                    <RemoveIcon/>
                                                </button>
                                            </div>   
                                        </div>   
                                    </div>   

                                    <div className="w-[70%] flex justify-center">
                                        {
                                            invObj[el] > 10 ? null :
                                            <div className="flex justify-center items-center w-[25%] bg-orange-base opacity-50 text-white-default text-xs p-2 rounded-lg">
                                                {
                                                    invObj[el] <= 10 ? (invObj[el] == 0 ? `no more allowed` : `Only ${invObj[el]} Left` ): null
                                                }
                                            </div>   
                                        }
                                    </div>    

                                    
                                </div>

                            </div>
                        </div>
                    )
                })
            }
        </div>  

        <div className="mt-10 flex flex-col justify-center w-[70%]">
            <div className="flex flex-col gap-8">
                <hr></hr>
                <div className="flex w-[70%] justify-end items-center font-bold text-xl gap-16 self-end">
                    <p className="w-[15%] text-right  mr-20">Subtotal</p>
                    <p className="text-gray-icon_light w-[10%]">£{total.toFixed(2)}</p>
                    <button className="active:scale-90 bg-white-default text-white-default px-6 py-2 rounded-md" disabled={true}>
                        Checkout
                    </button>
                </div>
                <hr></hr>
                <div className="flex w-[70%] justify-end items-center font-bold text-xl  gap-16 self-end"> 
                    <p className=" w-[15%] text-right mr-20">Discount</p>
                    <p className="text-gray-icon_light w-[10%]">£0.00</p>
                    <button className="active:scale-90 bg-white-default text-white-default px-6 py-2 rounded-md" disabled={true}>
                        Checkout
                    </button>
                </div>  
                <hr></hr>
                <div className="flex w-[70%] justify-end items-center font-bold text-xl gap-16 self-end">
                    <p className=" w-[15%] text-right mr-20">Total</p>
                    <p className="text-gray-icon_light w-[10%]">£{total.toFixed(2)}</p>
                    <button className="hover:cursor-pointer active:scale-90 bg-green-button text-white-default px-6 py-2 rounded-md">
                        Checkout
                    </button>
                </div>
                <hr></hr>
            </div>
        </div>

    
        </>  
    )
}

export default CartItemCard