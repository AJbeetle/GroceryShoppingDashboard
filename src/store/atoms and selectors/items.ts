import {atom, useRecoilState, selector} from "recoil"
import axios from "axios"
import type { apiItems, cardItems } from "../../types/interfaces/items";

const BASE_URL:string = import.meta.env.VITE_BACKEND_BASE_URL;

const allItemAtom = atom ({
    key : "itemDetails",
    default : selector({
        key : "itemDetailSelector",
        get : async function({get}){
            const res = await axios.get(`${BASE_URL}/?category=all`);
            return res.data;
        }
    })
})

const cardItemsSelector = selector({
    key : "fetching_only_card_relevant_data",
    get : function({get}){
        const allData:apiItems[] = get(allItemAtom);
        // const limitedData:cardItems = {
        //     name : allData.name,
        //     type : allData.type,
        //     description : allData.description,
        //     available : allData.available,
        //     img: allData.img,
        //     price : allData.price
        // }

        const limitedData:cardItems[]=[];
        for(let i=0; i<allData.length; i++){
            limitedData[i] = {
                name : allData[i].name,
                type : allData[i].type,
                description : allData[i].description,
                available : allData[i].available,
                img: allData[i].img,
                price : allData[i].price
            } 
        }
        return limitedData;
    }
})

const trendingItemSelector = selector({
    key : "trendingItems",
    get : function({get}){
        const allItem:apiItems[]  = get(allItemAtom);
        const trending:apiItems[] = allItem.filter(el => el.rating>=4.5);
        return trending;
    }
})

const fruitSelector = selector({
    key : "fruitSelector",
    get : function({get}){

    }
})

const bakerySelector = selector({
    key : "bakeryItems",
    get : function({get}){

    }
})

const drinkSelector = selector({
    key : "drinkItems",
    get : function({get}){

    }
})


export {
    allItemAtom, cardItemsSelector, fruitSelector, bakerySelector, drinkSelector, trendingItemSelector
}