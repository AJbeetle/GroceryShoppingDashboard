import {useRecoilValue, useSetRecoilState} from "recoil"
import { allItemAtom, cardItemsSelector, trendingItemSelector, fruitSelector, drinkSelector, bakerySelector } from "../store/atoms and selectors/items"
import type { apiItems, cardItems } from "../types/interfaces/items";
import ItemCard from "../components/ui/itemCard";
import { cartCountAtom } from "../store/atoms and selectors/cart";
import TopBar from "../components/ui/topBar";
import { PiSlidersHorizontalFill } from "react-icons/pi";


function DesignSheet(){
    const items:cardItems[] = useRecoilValue(cardItemsSelector);
    const trendy:apiItems[] = useRecoilValue(trendingItemSelector);
    const fruits:apiItems[] = useRecoilValue(fruitSelector);
    const drinks:apiItems[] = useRecoilValue(drinkSelector);
    const bakery:apiItems[] = useRecoilValue(bakerySelector);
    const cartItemsCount = useRecoilValue(cartCountAtom);

    const Likes = localStorage.getItem("Like")
    const LikeObject = JSON.parse(Likes as string);
    // const LikeObjKeys = Object.keys(LikeObject);

    const Inventory = localStorage.getItem("Inventory");
    const InvObj = JSON.parse(Inventory as string);
    // const InvObjKeys = Object.keys(InvObj);
    
    

    return (
        <div className="flex flex-wrap flex-col ">
            <TopBar/>
            <div className="m-10 p-4 bg-red-800 text-white-default">
                Cart : {
                    cartItemsCount
                }
            </div>
            <p className="text-xl font-bold m-10">
                    All ITEMS 
            </p>
            <div className="allItems flex flex-wrap">
                {
                    items.map((el:cardItems,i:number) => {
                        if(LikeObject.items[`${el.name}`]===true){
                            return (
                                <ItemCard item={el} likeState={true} key={i} userSessionItemAvailable={InvObj[`${el.name}`]}></ItemCard>
                            )
                        }
                        else{
                            return (
                                <ItemCard item={el} likeState={false} key={i} userSessionItemAvailable={InvObj[`${el.name}`]}></ItemCard>
                            )
                        }

                        
                    })
                }
            </div>
            
            {/* <p className="text-xl font-bold m-10">
                    TRENDY ITEMS 
            </p>
            <div className="trendyItems flex flex-wrap">
                {
                    trendy.map((el:apiItems,i:number)=>{
                        return (
                        <ItemCard item={el} key={i}></ItemCard>
                        )
                    })
                }
            </div>
            <p className="text-xl font-bold m-10">
                    FRUTIS 
            </p>
            <div className="Fruits flex flex-wrap">
                {
                    fruits.map((el:apiItems,i:number)=>{
                        return (
                        <ItemCard item={el} key={i}></ItemCard>
                        )
                    })
                }
            </div>
            <p className="text-xl font-bold m-10">
                    DRINKS
            </p>
            <div className="Drinks flex flex-wrap">
                {
                    drinks.map((el:apiItems,i:number)=>{
                        return (
                        <ItemCard item={el} key={i}></ItemCard>
                        )
                    })
                }
            </div>
            <p className="text-xl font-bold m-10">
                    BAKERY
            </p>
            <div className="Bakery flex flex-wrap">
                {
                    bakery.map((el:apiItems,i:number)=>{
                        return (
                        <ItemCard item={el} key={i}></ItemCard>
                        )
                    })
                }
            </div> */}
        </div>
    )
}

export default DesignSheet