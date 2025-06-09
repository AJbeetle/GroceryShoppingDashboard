/* this page will have four categorical views :-
1. If user has just arrived on the page then the trending items will be shown.
2. If user selects AllItems from categories : then show all items
3. If user selects Fruit : show all fruits in API
3. If user selects Drinks : show all Drinks in API
3. If user selects Bakery : show all Bakery in API
*/

import {useRecoilValue} from "recoil"
import { cardItemsSelector, searchItemsSelector } from "../store/atoms and selectors/items"
import type { apiItems, cardItems } from "../types/interfaces/items";
import ItemCard from "../components/ui/itemCard";
// import { cartCountAtom } from "../store/atoms and selectors/cart";
import TopBar from "../components/ui/topBar";
// import { PiSlidersHorizontalFill } from "react-icons/pi";
import {useState} from "react"
// import type { LikeObjType, InvObjType, CartObjType } from "../store/loaclStorage";
// import CartItemCard from "../components/ui/cartCard";
import BackToTopButton from "../components/ui/takeToTop";
// import { likedElementSelector } from "../store/atoms and selectors/items"; 

function LikePage(){
    const [item, setItem ] = useState(false); //this is just a state atom to be triggered in order to re render this design page : if something is added to cart, or liked from user in search panel
    const searchs:apiItems[] = useRecoilValue(searchItemsSelector);
    const allItems = useRecoilValue(cardItemsSelector);
    
    // const cartItemsCount = useRecoilValue(cartCountAtom);
    // const [cartReRender, setCartReRender] = useState(false);
    // const likes:apiItems[] = useRecoilValue(likedElementSelector) as apiItems[];

    // const [view, setView] : [cardItems[] | apiItems[], React.Dispatch<React.SetStateAction<undefined>> | any] = useState(items);
    const [view, setView] = useState<cardItems[] | apiItems[] | undefined>(undefined);
    // let LikeObject:Record<string,number|Record<string, boolean>>, InvObj:Record<string, number>, CartObj:Record<string,number|Record<string, number>>;

    let LikeObject = JSON.parse(localStorage.getItem("Like") as string);
    let InvObj = JSON.parse(localStorage.getItem("Inventory") as string);
    let CartObj = JSON.parse(localStorage.getItem("Cart") as string);
    // let offerObj = JSON.parse(localStorage.getItem("Offers") as string);
    console.log(item, view)

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
                                        <ItemCard item={el} likeState={likeState} cartCount={CartObj.items[el.name]} cartState={cartAvail} key={el.id || el.name || i} userSessionItemAvailable={invCount} setExtraRender={setItem}></ItemCard>
                                    )

                            
                            })  
                        }
                    </div>
                </div> :
                <div id="itemsDiv" className=" w-[100%]">

                    {/* ELEMENT 4 : ITEMS LIST IN FORM OF CARDS --------------------------------------------------------------------------------------------- */}
                    <div className="flex flex-wrap w-full">
                        {
                            <div className="flex flex-col w-full"> 
                                <p className="mt-10 text-xl font-bold p-2">LIKED ITEMS...</p>

                                <div className="flex w-full flex-wrap">
                                    {
                                        Object.keys(LikeObject.items).map((el, i)=>{
                                            if(LikeObject.items[el]===true){
                                                const element = allItems.find(e=> e.name==el) as cardItems;
                                                const cartAvail = (CartObj.items[element.name]==0 || CartObj.items[element.name]==undefined) ? false : true;
                                                const likeState = (LikeObject.items[element.name]===true) ? true : false;
                                                const invCount = InvObj[element.name]
                                                return (
                                                    //@ts-ignore
                                                    <ItemCard item={element} likeState={likeState} cartCount={CartObj.items[element.name]} cartState={cartAvail} key={el.id || i} userSessionItemAvailable={invCount} setExtraRender={setItem} ></ItemCard>
                                                )
                                            }
                                            return null;
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

export default LikePage