import {atom, selector} from "recoil"


const cartCountAtom = atom({
    key : "countOfTotalItemsInCart",
    default : JSON.parse(localStorage.getItem("Cart") as string)["count"]
})

const cartElementsAtom = atom({
    key : "allCartItems",
    default : JSON.parse(localStorage.getItem("Cart") as string)["items"]
})

export {
    cartCountAtom,
    cartElementsAtom
}