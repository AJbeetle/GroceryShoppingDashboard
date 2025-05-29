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

import type { cartCardItems } from "../../types/interfaces/items";

const cartCardSelector = selector({
    key : "valuesNeededForCartCard",
    get : function({get}){
        const allData:apiItems[] = get(allItemAtom);
        const limitedData:cartCardItems[]=[];

        for(let i=0; i<allData.length; i++){
            limitedData[i] = {
                id : allData[i].id,
                name : allData[i].name,
                price : allData[i].price,
                img : allData[i].img
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

const likedElementSelector = selector({
    key : "likedItemsForRecommendations",
    get : function({get}){
        let Liked:apiItems[] = [];
        try{
            const like = localStorage.getItem("Like");
            if(!like) return Liked;  // returning empty array as no recommendation for user
            const likeObj = JSON.parse(like);
            const extractingNamesOfLikedElems:string[] = [];
            const LikeElems = Object.keys(likeObj.items);
        
            for(let i=0; i<LikeElems.length; i++){
                if(likeObj.items[LikeElems[i]]===true){
                    extractingNamesOfLikedElems.push(LikeElems[i]);
                }
            }

            const allItems:apiItems[] = get(allItemAtom);
            Liked = allItems.filter((el)=> extractingNamesOfLikedElems.includes(el.name));
            return Liked;
        }
        catch(e){
            console.log("Error Parsing the Like from localStorage",e);
        }
    }
})


// Creating Separate atoms : making more backend API calls, will be useful if databsse is very heavy and lazy loading is required or data is paginated and when we donot have shared abse data. 
/* const fruitAtom = atom ({
    key : "fruitsDetails",
    default : selector({
        key : "fruitsDetailSelector",
        get : async function({get}){
            const res = await axios.get(`${BASE_URL}/?category=fruit`);
            return res.data;
        }
    })
})

const drinksAtom = atom ({
    key : "drinksDetails",
    default : selector({
        key : "drinksDetailSelector",
        get : async function({get}){
            const res = await axios.get(`${BASE_URL}/?category=drinks`);
            return res.data;
        }
    })
})


const bakeryAtom = atom ({
    key : "fruitsDetails",
    default : selector({
        key : "fruitsDetailSelector",
        get : async function({get}){
            const res = await axios.get(`${BASE_URL}/?category=bakery`);
            return res.data;
        }
    })
}) */




// The fruit, drinks and bakery items can be extracted using selectors too

const fruitSelector = selector({
    key : "fruitSelector",
    get : function({get}){
        const allItem:apiItems[]  = get(allItemAtom);
        const fruits:apiItems[] = allItem.filter(el => el.type==="fruit");
        return fruits;
    }
})

const bakerySelector = selector({
    key : "bakeryItems",
    get : function({get}){
        const allItem:apiItems[]  = get(allItemAtom);
        const bakery:apiItems[] = allItem.filter(el => el.type==="bakery");
        return bakery;

    }
})

const drinkSelector = selector({
    key : "drinkItems",
    get : function({get}){
        const allItem:apiItems[]  = get(allItemAtom);
        const drinks:apiItems[] = allItem.filter(el => el.type==="drinks");
        return drinks;   
    }
})

const searchResultAtom = atom({
    key : "itemSearchResult",
    default : []
})

const searchItemsSelector = selector({
    key : "searchItemData",
    get : function({get}){
        const namesToMatch:string[] = get(searchResultAtom);
        const MatchList:string[] = namesToMatch.map(el => el.toLowerCase()); 
        const allItems:apiItems[] = get(allItemAtom);
        const searchItems:apiItems[] = allItems.filter(el => MatchList.includes(el.name.toLowerCase()))
        return searchItems;
    }
})



export {
    allItemAtom, 
    cardItemsSelector, 
    fruitSelector, 
    bakerySelector, 
    drinkSelector, 
    trendingItemSelector,
    searchResultAtom,
    searchItemsSelector,
    cartCardSelector,
    likedElementSelector
    // bakeryAtom,
    // fruitAtom,
    // drinksAtom
}