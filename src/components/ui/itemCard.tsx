import type { cardItems } from "../../types/interfaces/items"
import type { apiItems } from "../../types/interfaces/items"
import CartIcon from "../icons/cart"
import LikeIcon from "../icons/like"
import {useState, useRef} from "react";


function ItemCard({item, likeState, userSessionItemAvailable} : {
    item : cardItems,
    likeState:boolean,
    userSessionItemAvailable:number
}){
    const [stateOfLike, setStateOfLike] = useState(likeState); // this is used just to make re-render in the page so that like button gets colored to red
    const [itemAvailability, setItemAvailability] = useState(userSessionItemAvailable);
    const dialogBox = useRef(null);

    function toggleLike(){
        const likeObj = JSON.parse(localStorage.getItem("Like") as string);
        likeObj[`${item.name}`] = !likeObj[`${item.name}`];
        localStorage.setItem("Like",JSON.stringify(likeObj));
        setStateOfLike(t => !t);
    }

    
    function addtoCart(){
        const cartObj = JSON.parse(localStorage.getItem("Cart") as string);
        if(cartObj.items[item.name]){
            alert("you already added this in cart, inc quantity in cart screen")
            return;
        }
        else{
            if(cartObj.items[item.name] == null || cartObj.items[item.name] ==  undefined){
                cartObj.items[item.name] = 1;
                cartObj.count++;
                localStorage.setItem("Cart",JSON.stringify(cartObj));
            } 
            else{
                cartObj.items[item.name]++;
                cartObj.count++;
                localStorage.setItem("Cart",JSON.stringify(cartObj));
            }
        }

        const invObj = JSON.parse(localStorage.getItem("Inventory") as string);
        invObj[`${item.name}`] = invObj[`${item.name}`] - 1 ;
        localStorage.setItem("Inventory",JSON.stringify(invObj));
        

        setItemAvailability(t => t-1);

        // const cartObj = JSON.parse(localStorage.getItem("Cart") as string);
        // likeObj[`${item.name}`] = !likeObj[`${item.name}`];
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
                            <button className="active:scale-90 disabled:scale-100 disabled:cursor-not-allowed" disabled={itemAvailability==0?true:false} onClick={()=>addtoCart()} >
                                <CartIcon/>
                            </button>
                            <button className="" onClick={()=>toggleLike()}>
                                 <LikeIcon style="text-3xl" state={stateOfLike}/>
                            </button>
                        </div>

                    </div>
                </div>

                <dialog ref={dialogBox}>
                    <div>
                        This is add to cart dialog box
                    </div>
                </dialog>
                
            </div>
        </div>
    )
}

export default ItemCard