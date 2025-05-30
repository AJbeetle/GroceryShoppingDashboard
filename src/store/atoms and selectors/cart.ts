import {atom} from "recoil"


// const cartCountAtom = atom({
//     key : "countOfTotalItemsInCart",
//     default : JSON.parse(localStorage.getItem("Cart") as string)["count"]
// })

// const cartElementsAtom = atom({
//     key : "allCartItems",
//     default : JSON.parse(localStorage.getItem("Cart") as string)["items"]
// })

// The above code creates issue : as in first render there will be no localStorage data [as useEffect runs after firstRender ans localStorage is set inside useEffect which mounts App.tsx]. SO, 
// since, in first render we don't have localStorage keys Cart, Inventory, Like and Offers . So, directly fetching is not recommended and will generate errors and will prevent whole app from being loaded

const cartCountAtom = atom({
    key : "countOfTotalItemsInCart",
    default : (() => {
        try{
            const cart = localStorage.getItem("Cart");
            if(!cart) return 0; // fallback if no cart in storage, then cartCountAtom will have atomatically value 0
            const cartObj = JSON.parse(cart);
            return cartObj.count ?? 0; //fallback if cartObj does not have count key
        }
        catch(e){
            console.error("Error parsing Cart from localStorage:", e);
            return 0;
        }
    })()
})

const cartElementsAtom = atom({
    key : "allCartItems",
    default : (()=>{
        try{
            const cart = localStorage.getItem("Cart");
            if(!cart) return {}; // fallback if no cart in storage, then cartElementAtom will have atomatically be empty object {}
            const cartObj = JSON.parse(cart);
            return cartObj.items ?? {}; //fallback if cartObj does not have items key 
        }
        catch(e){
            console.error("Error parsing Cart from localStorage:", e);
        }
    })()
})

export {
    cartCountAtom,
    cartElementsAtom
}