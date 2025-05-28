import {useRecoilValue, useSetRecoilState} from "recoil"
import { allItemAtom, cardItemsSelector, trendingItemSelector, fruitSelector, drinkSelector, bakerySelector, searchItemsSelector } from "../store/atoms and selectors/items"
import type { apiItems, cardItems } from "../types/interfaces/items";
import ItemCard from "../components/ui/itemCard";
import { cartCountAtom } from "../store/atoms and selectors/cart";
import TopBar from "../components/ui/topBar";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import {useRef, useState, useEffect} from "react"
import type { LikeObjType, InvObjType, CartObjType } from "../store/loaclStorage";

function DesignSheet(){
    const [item, setItem ] = useState(false); //this is just a state atom to be triggered in order to re render this design page : if something is added to cart, or liked from user in search panel
    const items:cardItems[] = useRecoilValue(cardItemsSelector);
    const trendy:apiItems[] = useRecoilValue(trendingItemSelector);
    const fruits:apiItems[] = useRecoilValue(fruitSelector);
    const drinks:apiItems[] = useRecoilValue(drinkSelector);
    const bakery:apiItems[] = useRecoilValue(bakerySelector);
    const searchs:apiItems[] = useRecoilValue(searchItemsSelector);
    const cartItemsCount = useRecoilValue(cartCountAtom);

    // const [view, setView] : [cardItems[] | apiItems[], React.Dispatch<React.SetStateAction<undefined>> | any] = useState(items);
    const [view, setView] = useState<cardItems[] | apiItems[]>(items);
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
            <TopBar/>   


            {/* ELEMENT 2 : SEARCH_RESULTS --------------------------------------------------------------------------------------------- */}
            <p className="text-xs font-bold  mt-10 w-[100%]">SEARCH RESULTS WILL APPEAR HERE ...</p>
            {
                searchs.length>0 ? 
                <div className="flex flex-wrap flex-col w-[100%] justify-center p-2 items-start overflow-scroll scrollbar-none"> 
                <div className="flex overflow-hidden justify-center items-center ">
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
            <div>
                {/* ELEMENT 3 : CATEORIES BUTTONS --------------------------------------------------------------------------------------------- */}
                <div className="m-5 p-2 flex w-full justify-start gap-8">
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
                <div className="flex flex-wrap">
                    {
                        view.map((el:apiItems | cardItems,i:number) => {
                            //  console.log(el);
                            const cartAvail = (CartObj.items[el.name]==0 || CartObj.items[el.name]==undefined) ? false : true;
                            const likeState = (LikeObject.items[el.name]===true) ? true : false;
                            const invCount = InvObj[el.name]

                            // console.log(`${CartObj.items[el.name]} : ${cartAvail}`);
                            // console.log(`${LikeObject.items[el.name]} : ${likeState}`);
                            // console.log(`${InvObj[el.name]} : ${invCount}`);

                            return (
                                // bro I just spent last 5-6 hours finding what the error is in my UI, that my cards are not displaying props properly : and it was this key prop which was skdnsakdj the UI
                                // DAAMMMNNNN NOW I UNDERSTOOD THE REAL RELEVANCE OF *********KEY*********
                                    //@ts-ignore
                                    <ItemCard item={el} likeState={likeState} cartState={cartAvail} key={el.id || el.name} userSessionItemAvailable={invCount}></ItemCard>
                            )

                            // if(LikeObject.current.items[`${el.name}`]){
                            //     console.log(`${el.name} : ${CartObj.current.items[el.name]} : `);
                            //     return (
                            //         <ItemCard item={el} likeState={true} cartState={cartAvail} key={i} userSessionItemAvailable={InvObj.current[`${el.name}`]}></ItemCard>
                            //     )
                            // }
                            // else{
                            //     console.log(`${el.name} : ${CartObj.current.items[el.name]}`);
                            //     return (
                            //         <ItemCard item={el} likeState={false} cartState={cartAvail} key={i} userSessionItemAvailable={InvObj.current[`${el.name}`]}></ItemCard>
                            //     )
                            // }
                        })
                    }
                </div>
            </div>
            }
            

            
            
        </div>
    )
}

export default DesignSheet