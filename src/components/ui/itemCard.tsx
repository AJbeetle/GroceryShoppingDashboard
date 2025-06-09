import type { cardItems } from "../../types/interfaces/items"
import type { apiItems } from "../../types/interfaces/items"
import CartIcon from "../icons/cart"
import LikeIcon from "../icons/like"
import {useState} from "react";
import {useSetRecoilState} from "recoil"
import { cartCountAtom } from "../../store/atoms and selectors/cart";
import { likedCountAtom } from "../../store/atoms and selectors/like";
// import type { OffersType } from "../../store/loaclStorage";
import { AddIcon, MinusIcon} from "../icons/cartFunc";


function ItemCard({item, likeState, userSessionItemAvailable, cartState, setExtraRender, cartCount} : {
    item : cardItems | apiItems,
    likeState:boolean,
    userSessionItemAvailable:number,
    cartState:boolean, 
    setExtraRender?: React.Dispatch<React.SetStateAction<boolean>>,
    cartCount:number
}){
    const [stateOfLike, setStateOfLike] = useState(likeState); // this is used just to make re-render in the page so that like button gets colored to red
    const [stateOfCart, setStateOfCart] = useState(cartState);
    const [itemAvailability, setItemAvailability] = useState(userSessionItemAvailable);
    const setCartCount = useSetRecoilState(cartCountAtom);
    const setLikeCount = useSetRecoilState(likedCountAtom);
    const offerObj= JSON.parse(localStorage.getItem("Offers") as string);
    const invObj = JSON.parse(localStorage.getItem("Inventory") as string);
    


    function toggleLike(){
        
        const likeObj = JSON.parse(localStorage.getItem("Like") as string);
        const setVal = !likeObj.items[`${item.name}`];
        likeObj.items[`${item.name}`] = !likeObj.items[`${item.name}`];
        localStorage.setItem("Like",JSON.stringify(likeObj));
        
        // basically we will update the stateofLike later first we do the dom manipulation 
        if(stateOfLike === false){
            // it means if earlier state was false then now currently we are liking it so, inc like count by 1
            if(setVal){
                likeObj["count"] = likeObj["count"]+1;
                localStorage.setItem("Like",JSON.stringify(likeObj));
            }
            //@ts-ignore
            setLikeCount(t=>t+1);
            if(setExtraRender){
                setExtraRender(t=>!t)
            }
            
        }
        else if(stateOfLike === true){
            // it means if earlier state was true then now currently we are unliking it so, dec like count by 1
            if(!setVal){
                likeObj["count"] = likeObj["count"]-1;
                localStorage.setItem("Like",JSON.stringify(likeObj));
            }
            //@ts-ignore
            setLikeCount(t=>t-1);
            if(setExtraRender){
                setExtraRender(t=>!t)
            }
        }

        setStateOfLike(t => !t);

        // setLikeAtom(JSON.parse(localStorage.getItem("Like") as string)["items"])
    }

    // This below addtoCart function had redundant code
    // function addtoCart(){
    //     const cartObj = JSON.parse(localStorage.getItem("Cart") as string);
    //     if(cartObj.items[item.name]){
    //         alert("you already added this in cart, inc quantity in cart screen")
    //         return;
    //     }
    //     else{
    //         if(cartObj.items[item.name] == null || cartObj.items[item.name] ==  undefined){
    //             cartObj.items[item.name] = 1;
    //             cartObj.count++;
    //             localStorage.setItem("Cart",JSON.stringify(cartObj));
    //             //@ts-ignore
    //             setCartCount(t=>t+1);
    //         } 
    //         else{
    //             cartObj.items[item.name]++;
    //             cartObj.count++;
    //             localStorage.setItem("Cart",JSON.stringify(cartObj));
    //             //@ts-ignore
    //             setCartCount(t=>t+1);
    //         }
    //     }


    function addtoCart(){
        // Now Item is already in cart, we will just increase or decrease the quantity

        const cartObj = JSON.parse(localStorage.getItem("Cart") as string);
        cartObj.items[item.name]++;
        cartObj.count++;
        localStorage.setItem("Cart",JSON.stringify(cartObj));


        //@ts-ignore
        setCartCount(t=>t+1);
        if(setExtraRender){
            setExtraRender(t=>!t)
        }
        

        const invObj = JSON.parse(localStorage.getItem("Inventory") as string);
        invObj[`${item.name}`] = invObj[`${item.name}`] - 1 ;
        localStorage.setItem("Inventory",JSON.stringify(invObj));
        

        setItemAvailability(t => t-1);

        if(Object.keys(offerObj).includes(item.name)){
            const freeObj = JSON.parse(localStorage.getItem("Free") as string);
            const multiple = offerObj[item.name]["itemCount"];
            const itemOffered = offerObj[item.name]["itemOffered"].name;   //this variable stores name of whatever is free OR you can say addOn
            const itemCount = offerObj[item.name]["itemOffered"].quantity;    //this is quantity of free item
            console.log(`${item.name} have offer multiple : ${multiple} `)
            console.log(cartObj.items[item.name]%multiple)
            if(cartObj.items[item.name]%multiple==0){
                console.log("itemOffered : ",itemOffered, "number of free item : ", itemCount);
                console.log("offer applicable");
                console.log(`Free items number : ${(cartObj.items[item.name]/multiple)*itemCount}`)

                if(freeObj.items[itemOffered]==undefined){
                    // freeObj.count++;
                    freeObj.items[itemOffered]=(cartObj.items[item.name]/multiple)*itemCount;
                }
                // console.log(freeObj.items[itemOffered]);
                else{
                    // freeObj.count++;
                    freeObj.items[itemOffered]=(cartObj.items[item.name]/multiple)*itemCount;
                }
                localStorage.setItem("Free",JSON.stringify(freeObj));
            }
        }

        // const cartObj = JSON.parse(localStorage.getItem("Cart") as string);
        // likeObj[`${item.name}`] = !likeObj[`${item.name}`];
    }

    function minusFromCart(){
        const cartObj = JSON.parse(localStorage.getItem("Cart") as string);
        if(cartObj.items[item.name]==1){
            removeFromCart();
            // if(setExtraRender){
            //     setExtraRender(t=>!t)
            // }
            return;
        }

        cartObj.items[item.name]--;
        cartObj.count--;
        localStorage.setItem("Cart",JSON.stringify(cartObj));
        //@ts-ignore
        setCartCount(t=>t-1);
        if(setExtraRender){
            setExtraRender(t=>!t)
        }

        const invObj = JSON.parse(localStorage.getItem("Inventory") as string);
        invObj[`${item.name}`] = invObj[`${item.name}`] + 1 ;
        localStorage.setItem("Inventory",JSON.stringify(invObj));

        setItemAvailability(t => t+1);

        if(Object.keys(offerObj).includes(item.name)){
            const freeObj = JSON.parse(localStorage.getItem("Free") as string);
            const multiple = offerObj[item.name]["itemCount"];
            const itemOffered = offerObj[item.name]["itemOffered"].name;   //this variable stores name of whatever is free OR you can say addOn
            const itemCount = offerObj[item.name]["itemOffered"].quantity;    //this is quantity of free item
            console.log(`${item.name} have offer multiple : ${multiple} `)
            // console.log(cartObj.items[elm.name]%multiple)
            if(cartObj.items[item.name]%multiple==0){
                console.log("itemOffered : ",itemOffered, "number of free item : ", itemCount);
                console.log("offer applicable");
                console.log(`Free items number : ${(cartObj.items[item.name]/multiple)*itemCount}`)

                if(freeObj.items[itemOffered]==undefined){
                    // freeObj.count++;
                    freeObj.items[itemOffered]=(cartObj.items[item.name]/multiple)*itemCount;
                }
                // console.log(freeObj.items[itemOffered]);
                else{
                    // freeObj.count++;
                    freeObj.items[itemOffered]=(cartObj.items[item.name]/multiple)*itemCount;
                }
                localStorage.setItem("Free",JSON.stringify(freeObj));
            }
            else{
                if(freeObj.items[itemOffered]>0){
                    // freeObj.items[itemOffered]=freeObj.items[itemOffered] - 1;
                    freeObj.items[itemOffered]=(Math.floor(cartObj.items[item.name]/multiple))*itemCount;
                    localStorage.setItem("Free",JSON.stringify(freeObj));
                }
            }
        }
    }

    function removeFromCart(){
        const cartObj = JSON.parse(localStorage.getItem("Cart") as string);
        const item_count = cartObj.items[item.name];
        cartObj["count"] = cartObj["count"]-item_count;
        delete cartObj.items[item.name]
        localStorage.setItem("Cart",JSON.stringify(cartObj));

        // @ts-ignore
        setCartCount(t=> t-item_count);
        setStateOfCart(t=>!t)
        if(setExtraRender){
            setExtraRender(t=>!t);
        }
        
        const invObj = JSON.parse(localStorage.getItem("Inventory") as string);
        invObj[item.name] = invObj[item.name] + item_count
        localStorage.setItem("Inventory",JSON.stringify(invObj));

        if(Object.keys(offerObj).includes(item.name)){
            const freeObj = JSON.parse(localStorage.getItem("Free") as string);
            const itemOffered = offerObj[item.name]["itemOffered"].name;   //this variable stores name of whatever is free OR you can say addOn
            if(freeObj.items[itemOffered]>0){
                    freeObj.items[itemOffered]=0;
                    localStorage.setItem("Free",JSON.stringify(freeObj));
            }
        }

        // setReRender(t=>!t);
        if(setExtraRender){
            setExtraRender(t=>!t);
        }
    }

    function toggleCart(){
        //initial add to the cart
        const cartObj = JSON.parse(localStorage.getItem("Cart") as string);
        cartObj.items[item.name] = 1;
        cartObj.count++;
        localStorage.setItem("Cart",JSON.stringify(cartObj));
        //@ts-ignore
        setCartCount(t=>t+1);
        if(setExtraRender){
             setExtraRender(t=>!t)
        }
        setStateOfCart(t=>!t);


        const invObj = JSON.parse(localStorage.getItem("Inventory") as string);
        invObj[`${item.name}`] = invObj[`${item.name}`] - 1 ;
        localStorage.setItem("Inventory",JSON.stringify(invObj));
        

        setItemAvailability(t => t-1);
    }

    

    return (
        <div className="flex bg-white-default m-2 w-[500px] h-[300px] shadow-xl rounded-3xl jusitfy-center items-start">
            <div className="flex flex-1 w-full h-full justify-center items-center">
                <img src={`${item.img}`} className=" w-[200px] h-[200px] rounded-xl"></img>
            </div>
            <div className="flex flex-1 flex-col p-4 items-start h-full w-full justify-between ">
                <div className="h-[100px] w-full overflow-hidden text-ellipsis hover:cursor-pointer active:scale-95">
                    <p className="font-bold text-xl">
                        {item.name}
                    </p>
                    <p className="font-normal text-base">
                        {item.description}
                    </p>
                </div>

                <div className="w-full">
                    { 
                        offerObj[item.name]!=undefined? 
                        <div className="bg-yellow-400 text-white-default px-2 my-2 rounded-lg flex flex-col items-start">
                            <div className="font-bold underline">
                                Offer
                            </div>
                            <div>
                                Buy &nbsp;
                                { offerObj[item.name].itemCount }    
                                &nbsp;
                                GET { `+${offerObj[item.name]["itemOffered"].quantity}` } &nbsp;
                                {
                                    offerObj[item.name]["itemOffered"].name == item.name ? "More" : offerObj[item.name]["itemOffered"].name
                                }
                            </div>
                        </div> : 
                        null
                    }

                    <div className="w-full text-sm mb-10 ">
                        {
                            itemAvailability >=10 ? 
                            <div className="border border-solid border-green-base rounded-lg py-1 px-4 w-[50%] bg-green-base text-white-default flex justify-center opacity-50">Available</div> : itemAvailability == 0 ? 
                            <div className="border border-solid border-orange-base rounded-lg py-1 px-4 w-[50%] bg-orange-base text-white-default flex justify-center opacity-50">Out Of Stock</div> :
                            <div className="border border-solid border-orange-base rounded-lg py-1 px-4 w-[50%] bg-orange-base text-white-default flex justify-center opacity-50"> Only {itemAvailability} Left</div>
                        }
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <div className="text-xl font-bold">
                            {item.price}
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <div className="flex gap-2">
                                <button className="active:scale-90 disabled:scale-100 disabled:cursor-not-allowed" disabled={itemAvailability==0 || stateOfCart==true ?true:false} onClick={()=>toggleCart()} >
                                    <CartIcon fill={stateOfCart} style={`w-[28px] h-[27px]`}/>
                                </button>
                                {
                                    stateOfCart && 
                                    <div className="flex gap-2 bg-gray-200 p-2 rounded-lg" >
                                        <button className="active:scale-90 disabled:cursor-not-allowed disabled:scale-100" disabled={invObj[item.name]==0?true:false} onClick={()=>addtoCart()}>
                                            <AddIcon style={`w-4 h-4`}/>
                                        </button>

                                        <p>
                                            {cartCount}
                                        </p>   

                                        <button className="active:scale-90" onClick={()=>minusFromCart()}>
                                            <MinusIcon  style={`w-4 h-4`}/>
                                        </button>
                                    </div>
                                    
                                }
                            </div>
                            <button className="" onClick={()=>toggleLike()}>
                                 <LikeIcon style="text-3xl" state={stateOfLike}/>
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ItemCard