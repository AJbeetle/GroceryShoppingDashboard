import {atom, selector} from "recoil"


const cartCountAtom = atom({
    key : "countOfTotalItemsInCart",
    default : JSON.parse(localStorage.getItem("Cart") as string)["count"]
})

export {
    cartCountAtom
}