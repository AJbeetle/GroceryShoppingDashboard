import {useRecoilValue} from "recoil"
import { cardItemsSelector, searchItemsSelector } from "../store/atoms and selectors/items"
import type { apiItems, cardItems } from "../types/interfaces/items";
import ItemCard from "../components/ui/itemCard";
import { cartCountAtom } from "../store/atoms and selectors/cart";
import TopBar from "../components/ui/topBar";
// import { PiSlidersHorizontalFill } from "react-icons/pi";
import {useState} from "react"
// import {useRef, useState, useEffect} from "react"
// import type { LikeObjType, InvObjType, CartObjType } from "../store/loaclStorage";
import CartItemCard from "../components/ui/cartCard";
import BackToTopButton from "../components/ui/takeToTop";


function CartPage(){
    const [item, setItem ] = useState(false); //this is just a state atom to be triggered in order to re render this design page : if something is added to cart, or liked from user in search panel
    const items:cardItems[] = useRecoilValue(cardItemsSelector);
    const searchs:apiItems[] = useRecoilValue(searchItemsSelector);
    const cartItemsCount = useRecoilValue(cartCountAtom);
    const [cartReRender, setCartReRender] = useState(false);

    // const [view, setView] : [cardItems[] | apiItems[], React.Dispatch<React.SetStateAction<undefined>> | any] = useState(items);
    const [view, setView] = useState<cardItems[] | apiItems[] | undefined>(items);
    // let LikeObject:Record<string,number|Record<string, boolean>>, InvObj:Record<string, number>, CartObj:Record<string,number|Record<string, number>>;

    let LikeObject = JSON.parse(localStorage.getItem("Like") as string);
    let InvObj = JSON.parse(localStorage.getItem("Inventory") as string);
    let CartObj = JSON.parse(localStorage.getItem("Cart") as string);
    // let offerObj = JSON.parse(localStorage.getItem("Offers") as string);

    console.log(item,cartItemsCount,cartReRender, view,)


    // function changeView(viewName:apiItems[] | cardItems[]){
    //     setView(viewName);
    //     // console.log(view);
    // }

    return (
        <div className="flex flex-wrap flex-col">
            {/* ELEMENT 1 : TOPBAR --------------------------------------------------------------------------------------------- */}
            <div className="w-full left-0 bg-white-default h-[100px] flex justify-center items-center ">
                <TopBar setView={setView}/>   
            </div>  


            {/* ELEMENT 2 : SEARCH_RESULTS --------------------------------------------------------------------------------------------- */}
            <p className="text-xs font-bold m-4 w-[100%]"></p>
            {
                searchs.length>0 ? 
                // Scrollable Design : bottom two lines
                // <div className="flex flex-wrap flex-col w-[100%] justify-center p-2 items-start overflow-scroll scrollbar-none"> 
                // <div className="flex overflow-hidden justify-center items-center "> 

                // Non-scrollable design
                <div className="flex flex-wrap flex-col w-[100%] justify-center p-2 items-start"> 
                    <div className="flex overflow-hidden justify-start items-center flex-wrap">
                        {
                            searchs.map((el:apiItems | cardItems,i:number) => {
                                const cartAvail = (CartObj.items[el.name]==0 || CartObj.items[el.name]==undefined) ? false : true;
                                const likeState = (LikeObject.items[el.name]===true) ? true : false;
                                const invCount = InvObj[el.name]
                                console.log(i);
                                return (
                                        //@ts-ignore
                                        <ItemCard item={el} likeState={likeState} cartState={cartAvail} key={el.id || el.name} userSessionItemAvailable={invCount} setExtraRender={setItem}></ItemCard>
                                    )

                            
                            })  
                        }
                    </div>
                </div> :
                null
            }
            
            {/* ELEMENT 5 : ITEMS LIST IN FORM OF CARDS --------------------------------------------------------------------------------------------- */}
            <p className="font-bold text-2xl mb-20 p-8">CHECKOUT</p>
            <div className="mt-4 px-2 py-4">
                <CartItemCard cartItem={CartObj} setReRender={setCartReRender}/>
            </div>
            
            <BackToTopButton/>
            
        </div>
    )
}

export default CartPage