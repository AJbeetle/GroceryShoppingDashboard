import {useRecoilValue, useSetRecoilState} from "recoil"
import { allItemAtom, cardItemsSelector, trendingItemSelector } from "../store/atoms and selectors/items"
import type { apiItems, cardItems } from "../types/interfaces/items";
import ItemCard from "../components/ui/itemCard";


function DesignSheet(){
    const items:cardItems[] = useRecoilValue(cardItemsSelector);
    const trendy:apiItems[] = useRecoilValue(trendingItemSelector);

    return (
        <div>
            <div className="allItems">
                <p>
                    All IEMS 
                </p>
                {
                    items.map((el:cardItems,i:number) => {
                        return (
                            <ItemCard item={el} key={i}></ItemCard>
                        )
                    })
                }
            </div>

            <div className="trendyItems">
                <p>
                    Trendy Items
                </p>
                {
                    trendy.map((el:apiItems,i:number)=>{
                        return (
                        <ItemCard item={el} key={i}></ItemCard>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DesignSheet