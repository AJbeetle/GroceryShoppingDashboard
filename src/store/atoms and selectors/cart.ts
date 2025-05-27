import {atom, selector} from "recoil"

const cart = JSON.parse(localStorage.getItem("Cart") as string);

const cartCountAtom = atom({
    key : "countOfTotalItemsInCart",
    default : cart.count
})

export {
    cartCountAtom
}