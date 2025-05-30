/* this page will have four categorical views :-
1. If user has just arrived on the page then the trending items will be shown.
2. If user selects AllItems from categories : then show all items
3. If user selects Fruit : show all fruits in API
3. If user selects Drinks : show all Drinks in API
3. If user selects Bakery : show all Bakery in API
*/

import {useRecoilValue, useSetRecoilState} from "recoil"
import { allItemAtom, cardItemsSelector, trendingItemSelector, fruitSelector, drinkSelector, bakerySelector, searchItemsSelector } from "../store/atoms and selectors/items"
import type { apiItems, cardItems } from "../types/interfaces/items";
import ItemCard from "../components/ui/itemCard";
import { cartCountAtom } from "../store/atoms and selectors/cart";
import TopBar from "../components/ui/topBar";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import {useRef, useState, useEffect} from "react"
import type { LikeObjType, InvObjType, CartObjType } from "../store/loaclStorage";
import CartItemCard from "../components/ui/cartCard";
import BackToTopButton from "../components/ui/takeToTop";
import { likedElementSelector } from "../store/atoms and selectors/items"; 

function Dashboard(){
    const [item, setItem ] = useState(false); //this is just a state atom to be triggered in order to re render this design page : if something is added to cart, or liked from user in search panel
    const items:cardItems[] = useRecoilValue(cardItemsSelector);
    const trendy:apiItems[] = useRecoilValue(trendingItemSelector);
    const fruits:apiItems[] = useRecoilValue(fruitSelector);
    const drinks:apiItems[] = useRecoilValue(drinkSelector);
    const bakery:apiItems[] = useRecoilValue(bakerySelector);
    const searchs:apiItems[] = useRecoilValue(searchItemsSelector);
    const cartItemsCount = useRecoilValue(cartCountAtom);
    const [cartReRender, setCartReRender] = useState(false);
    const likes:apiItems[] = useRecoilValue(likedElementSelector) as apiItems[];

    // const [view, setView] : [cardItems[] | apiItems[], React.Dispatch<React.SetStateAction<undefined>> | any] = useState(items);
    const [view, setView] = useState<cardItems[] | apiItems[] | undefined>(undefined);
    // let LikeObject:Record<string,number|Record<string, boolean>>, InvObj:Record<string, number>, CartObj:Record<string,number|Record<string, number>>;

    let LikeObject = JSON.parse(localStorage.getItem("Like") as string);
    let InvObj = JSON.parse(localStorage.getItem("Inventory") as string);
    let CartObj = JSON.parse(localStorage.getItem("Cart") as string);
    let offerObj = JSON.parse(localStorage.getItem("Offers") as string);



    function changeView(viewName:apiItems[] | cardItems[]){
        setView(viewName);
        // console.log(view);
    }


    return (
        <div className="flex flex-wrap flex-col ">
            {/* ELEMENT 1 : TOPBAR --------------------------------------------------------------------------------------------- */}
            <div className="w-full left-0 bg-white-default h-[100px] flex justify-center items-center ">
                <TopBar setView={setView}/>   
            </div>  
            
            <div className="flec flex-wrap flex-col px-6">
            {/* ELEMENT 2 : SEARCH_RESULTS --------------------------------------------------------------------------------------------- */}
            <p className="text-xs font-bold m-4 w-[100%]"></p>
            {
                searchs.length>0 ? 
                <div id="searchDiv" className="flex flex-wrap flex-col justify-center p-2 items-start w-[100%]"> 
                    <div className="flex overflow-hidden justify-start items-center flex-wrap">
                        {
                            searchs.map((el:apiItems | cardItems,i:number) => {
                                const cartAvail = (CartObj.items[el.name]==0 || CartObj.items[el.name]==undefined) ? false : true;
                                const likeState = (LikeObject.items[el.name]===true) ? true : false;
                                const invCount = InvObj[el.name]

                                return (
                                        //@ts-ignore
                                        <ItemCard item={el} likeState={likeState} cartState={cartAvail} key={el.id || el.name} userSessionItemAvailable={invCount} setExtraRender={setItem}></ItemCard>
                                    )

                            
                            })  
                        }
                    </div>
                </div> :
                <div id="itemsDiv" className=" w-[100%]">
                    {/* ELEMENT 3 : CATEORIES BUTTONS --------------------------------------------------------------------------------------------- */}
                    <div className=" p-2     flex w-full justify-start gap-8 ">
                        <button className="bg-white-default w-[140px] rounded-full border-2 border-solid border-gray-stroke px-6 py-2 shadow-lg active:scale-95 " onClick={()=>changeView(items)}>
                            All Items
                        </button>
                        <button className="bg-white-default w-[140px] rounded-full border-2 border-solid border-gray-stroke px-6 py-2 shadow-lg active:scale-95" onClick={()=>changeView(drinks)}>
                            Drinks
                        </button>
                        <button className="bg-white-default w-[140px] rounded-full border-2 border-solid border-gray-stroke px-6 py-2 shadow-lg active:scale-95 " onClick={()=>changeView(fruits)}>
                            Fruits
                        </button>
                        <button className="bg-white-default w-[140px] rounded-full border-2 border-solid border-gray-stroke px-6 py-2 shadow-lg active:scale-95 " onClick={()=>changeView(bakery)}>
                            Bakery
                        </button>
                    </div>

                    {/* ELEMENT 4 : ITEMS LIST IN FORM OF CARDS --------------------------------------------------------------------------------------------- */}
                    <div className="flex flex-wrap w-full">
                        {
                            view!=null ? 
                            
                            view.map((el:apiItems | cardItems,i:number) => {
                                //  console.log(el);
                                const cartAvail = (CartObj.items[el.name]==0 || CartObj.items[el.name]==undefined) ? false : true;
                                const likeState = (LikeObject.items[el.name]===true) ? true : false;
                                const invCount = InvObj[el.name]

                                return (
                                        //@ts-ignore
                                        <ItemCard item={el} likeState={likeState} cartState={cartAvail} key={el.id || el.name} userSessionItemAvailable={invCount}></ItemCard>
                                )
                            }) 
                            :
                            <div className="flex flex-col w-full"> 
                            
                            <p className="mt-10 text-xl font-bold p-2">TRENDING ITEM</p>
                            <div className="flex w-full flex-wrap">

                            {trendy.map((el:apiItems | cardItems,i:number) => {
                                const cartAvail = (CartObj.items[el.name]==0 || CartObj.items[el.name]==undefined) ? false : true;
                                const likeState = (LikeObject.items[el.name]===true) ? true : false;
                                const invCount = InvObj[el.name]
                                return (
                                        //@ts-ignore
                                        <ItemCard item={el} likeState={likeState} cartState={cartAvail} key={el.id} userSessionItemAvailable={invCount} setExtraRender={setItem}></ItemCard>
                                    )
                            }) 
                            }

                            </div>
                            </div>   
                        }
                    </div>
                </div>
            }
            
            {/* ELEMENT 7 : Back To Top Button */}
            <BackToTopButton/>
            </div>
        </div>
    )
}

export default Dashboard