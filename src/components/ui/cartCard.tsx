import type { CartObjType } from "../../store/loaclStorage"
import {useRecoilValue, useSetRecoilState} from "recoil"
// import { freeItemsInCartCardSelector } from "../../store/atoms and selectors/items";
import { cartCardSelector } from "../../store/atoms and selectors/items";
import type { cartCardItems } from "../../types/interfaces/items";
import { AddIcon, MinusIcon, RemoveIcon } from "../icons/cartFunc";
import { cartCountAtom } from "../../store/atoms and selectors/cart";
import freeElementsAtom from "../../store/atoms and selectors/free";

import {useState, useEffect} from "react"

function CartItemCard({cartItem, setReRender}: {
    cartItem : CartObjType,
    setReRender: React.Dispatch<React.SetStateAction<boolean>>
}){
    const cartObj = JSON.parse(localStorage.getItem("Cart") as string);
    const invObj = JSON.parse(localStorage.getItem("Inventory") as string);
    const allItems = useRecoilValue(cartCardSelector);
    const offerObj = JSON.parse(localStorage.getItem("Offers") as string);
    const setCartCount = useSetRecoilState(cartCountAtom);
    const cartCount = useRecoilValue(cartCountAtom);
    const [itemAvailability, setItemAvailability] = useState(0);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    // const freeItems = useRecoilValue(freeItemsInCartCardSelector) as cartCardItems[];
    // console.log("free Items Selector : ",freeItems);
    const freeElemAtom = useRecoilValue(freeElementsAtom);
    console.log("free Atom  : ",freeElemAtom)
    console.log(itemAvailability);

    const [freeObj, setFreeObj] = useState<CartObjType>(JSON.parse(localStorage.getItem("Free") as string));

    function addToCART(elm : cartCardItems, offer:boolean){
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

        if(offer){
            const freeObj = JSON.parse(localStorage.getItem("Free") as string);
            const multiple = offerObj[elm.name]["itemCount"];
            const itemOffered = offerObj[elm.name]["itemOffered"].name;   //this variable stores name of whatever is free OR you can say addOn
            const itemCount = offerObj[elm.name]["itemOffered"].quantity;    //this is quantity of free item
            console.log(`${elm.name} have offer multiple : ${multiple} `)
            console.log(cartObj.items[elm.name]%multiple)
            if(cartObj.items[elm.name]%multiple==0){
                console.log("itemOffered : ",itemOffered, "number of free item : ", itemCount);
                console.log("offer applicable");
                console.log(`Free items number : ${(cartObj.items[elm.name]/multiple)*itemCount}`)

                if(freeObj.items[itemOffered]==undefined){
                    // freeObj.count++;
                    freeObj.items[itemOffered]=(cartObj.items[elm.name]/multiple)*itemCount;
                }
                // console.log(freeObj.items[itemOffered]);
                else{
                    // freeObj.count++;
                    freeObj.items[itemOffered]=(cartObj.items[elm.name]/multiple)*itemCount;
                }
                localStorage.setItem("Free",JSON.stringify(freeObj));
            }
            // NOT NEEDED FOLLOWING LOGIC WHEN ADDING TO CART
            // else{
            //     if(freeObj.items[itemOffered]>0){
            //         freeObj.items[itemOffered]=freeObj.items[itemOffered] - 1;
            //         localStorage.setItem("Free",JSON.stringify(freeObj));
            //     }
            // }
        }
        

    }
    
    function minusFromCART(elm : cartCardItems, offer:boolean){
        // update cartCountAtom
        // update localStorage cartObj
        // update localStorag invObj
        // disable add button if inventory goes to 0 after person adding it to cart
        const cartObj = JSON.parse(localStorage.getItem("Cart") as string);

        if(cartObj.items[elm.name] == 1){
            removeFromCART(elm, offer);
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

        if(offer){
            const freeObj = JSON.parse(localStorage.getItem("Free") as string);
            const multiple = offerObj[elm.name]["itemCount"];
            const itemOffered = offerObj[elm.name]["itemOffered"].name;   //this variable stores name of whatever is free OR you can say addOn
            const itemCount = offerObj[elm.name]["itemOffered"].quantity;    //this is quantity of free item
            console.log(`${elm.name} have offer multiple : ${multiple} `)
            // console.log(cartObj.items[elm.name]%multiple)
            if(cartObj.items[elm.name]%multiple==0){
                console.log("itemOffered : ",itemOffered, "number of free item : ", itemCount);
                console.log("offer applicable");
                console.log(`Free items number : ${(cartObj.items[elm.name]/multiple)*itemCount}`)

                if(freeObj.items[itemOffered]==undefined){
                    // freeObj.count++;
                    freeObj.items[itemOffered]=(cartObj.items[elm.name]/multiple)*itemCount;
                }
                // console.log(freeObj.items[itemOffered]);
                else{
                    // freeObj.count++;
                    freeObj.items[itemOffered]=(cartObj.items[elm.name]/multiple)*itemCount;
                }
                localStorage.setItem("Free",JSON.stringify(freeObj));
            }
            else{
                if(freeObj.items[itemOffered]>0){
                    // freeObj.items[itemOffered]=freeObj.items[itemOffered] - 1;
                    freeObj.items[itemOffered]=(Math.floor(cartObj.items[elm.name]/multiple))*itemCount;
                    localStorage.setItem("Free",JSON.stringify(freeObj));
                }
            }
        }
        
    }

    function removeFromCART(elm : cartCardItems, offer:boolean){
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

        if(offer){
            const freeObj = JSON.parse(localStorage.getItem("Free") as string);
            const itemOffered = offerObj[elm.name]["itemOffered"].name;   //this variable stores name of whatever is free OR you can say addOn
            if(freeObj.items[itemOffered]>0){
                    freeObj.items[itemOffered]=0;
                    localStorage.setItem("Free",JSON.stringify(freeObj));
            }
        }

        setReRender(t=>!t);
    }


    function SetTOTAL(){
        setTotal(0);
        const cartObj = JSON.parse(localStorage.getItem("Cart") as string);
        const freeObj = JSON.parse(localStorage.getItem("Free") as string);
        Object.keys(cartObj.items).map((el:string) => {
            const element = allItems.find(e=>e.name == el) as cartCardItems;
            const total = (parseFloat((element.price).split("£")[1])*cartItem.items[el]);
            setTotal(t => t+total);
        })

        Object.keys(freeObj.items).map((el:string) => {
            const element = allItems.find(e => e.name == el) as cartCardItems;
            const tot = parseFloat((element.price).split("£")[1])*freeObj.items[el];
            setTotal(t=>t+tot);
        })
    }

    function SetDISCOUNT(){
        setDiscount(0);
        const freeObj = JSON.parse(localStorage.getItem("Free") as string);
        Object.keys(freeObj.items).map((el:string) => {
            const element = allItems.find(e => e.name == el) as cartCardItems;
            const tot = parseFloat((element.price).split("£")[1])*freeObj.items[el];
            setDiscount(t=>t+tot);
        })

    }
    useEffect(function(){
        SetTOTAL();
        SetDISCOUNT();
    },[cartCount])

    useEffect(function(){
        function getFreeObj(){
            const freeOb = JSON.parse(localStorage.getItem("Free") as string)
            setFreeObj(freeOb);
        }

        setInterval(getFreeObj,500);

    },[])

    // useEffect(function(){
    //     console.log("free Atom  : ",freeElemAtom)
    // },[freeElemAtom])

    return (
        <>
        <div className="flex flex-col gap-8 bg-gray-100 p-4 rounded-xl">
            <p className="ml-6 text-gray-icon_dark font-bold">FREE ITEMS ADDED ..</p>
            <div className="flex flex-col gap-4">
                {
                    //@ts-ignore
                    Object.keys(freeObj?.items).map((el => {
                        const element = allItems.find(e => e.name == el) as cartCardItems;
                        if(freeObj.items[el]==0){
                            return null
                        }
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
                                            <p className="text-xl">
                                                {
                                                    freeObj.items[el]
                                                }
                                            </p>
                                        </div>

                                        <div className="flex justify-end items-center  gap-14 w-[30%]  ">
                                            <div className="line-through">
                                                £{(parseFloat((element.price).split("£")[1])*freeObj.items[el]).toFixed(2)}
                                            </div> 
                                            <div>
                                                £{(parseFloat((element.price).split("£")[1])*0).toFixed(2)}
                                            </div> 
                                        </div>   
                                    </div>                                       
                                </div>

                            </div>
                        </div>
                        )
                    }))
                }
            </div>  
        </div>

        {/* Cart Items */}    
        <div className="flex flex-col gap-8 mt-10">
            {
                Object.keys(cartItem.items).map((el:string,i:number)=>{
                    const element = allItems.find(e => e.name == el) as cartCardItems;
                    // const pr = (parseInt((element.price).split("£")[1])*cartItem.items[el]);
                    // console.log(pr);
                    // setItemAvailability(invObj[el]);    //it trigerrs inifinite renders 
                    console.log(i);
                    let offer = false;
                    console.log(Object.keys(offerObj));
                    if(Object.keys(offerObj).includes(el)){
                        offer = true;
                    }
                    else{
                        offer = false;
                    }
                    return (
                        <div className="w-[100%] flex gap-10">
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
                                            <button className="active:scale-90 disabled:scale-100 disabled:cursor-not-allowed rounded-lg" onClick={()=>minusFromCART(element, offer)} disabled={cartObj.items[el]===0?true:false}>
                                                <MinusIcon/>
                                            </button>
                                            <p className="text-xl">
                                                {
                                                    cartItem.items[el]
                                                }
                                            </p>
                                            <button className="active:scale-90 disabled:scale-100 disabled:cursor-not-allowed rounded-lg" onClick={()=>addToCART(element, offer)} disabled={invObj[el]===0?true:false}> 
                                                <AddIcon/>
                                            </button>
                                        </div>

                                        <div className="flex justify-end items-center  gap-14 w-[30%]  ">
                                            <div>
                                                £{(parseFloat((element.price).split("£")[1])*cartItem.items[el]).toFixed(2)}
                                                {/* £{(parseFloat((element.price).split("£")[1])).toFixed(2)} */}
                                            </div>

                                            <div className="justify-center items-center flex">
                                                <button className="active:scale-90 disabled:scale-100 disabled:cursor-not-allowed rounded-lg" onClick={()=>removeFromCART(element, offer)} disabled={false}>
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
                                                    invObj[el] <= 10 ? (invObj[el] == 0 ? `limit reached` : `Only ${invObj[el]} Left` ): null
                                                }
                                            </div>   
                                        }
                                    </div>    

                                    
                                </div>

                            </div>
                        </div>

                        {
                            offer && 
                            <div className="w-[20%] flex m-1 bg-yellow-400 font-bold text-white-default shadow-lg p-6 rounded-3xl justify-between">
                                 <div className="bg-yellow-400 text-white-default px-2 my-2 rounded-lg flex flex-col items-start">
                                    <div className="font-bold underline">
                                        Offer
                                    </div>
                                    <div>
                                        Buy &nbsp;
                                        { offerObj[el].itemCount }    
                                        &nbsp;
                                        GET &nbsp;
                                        { `+${offerObj[el]["itemOffered"].quantity}` } &nbsp;
                                        {
                                            offerObj[el]["itemOffered"].name == el ? "More" : offerObj[el]["itemOffered"].name
                                        }
                                    </div>
                                </div> 
                            </div>
                        }
                        
                            
                        </div>
                    )
                })
            }
        </div>  


        {/* Checkout Details */}
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
                    <p className="text-gray-icon_light w-[10%]">£{discount.toFixed(2)}</p>
                    <button className="active:scale-90 bg-white-default text-white-default px-6 py-2 rounded-md" disabled={true}>
                        Checkout
                    </button>
                </div>  
                <hr></hr>
                <div className="flex w-[70%] justify-end items-center font-bold text-xl gap-16 self-end">
                    <p className=" w-[15%] text-right mr-20">Total</p>
                    <p className="text-gray-icon_light w-[10%]">£{(total-discount).toFixed(2)}</p>
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