import {atom, selector} from "recoil"

const cart = JSON.parse(localStorage.getItem("Cart") as string);

const cartCount = atom({
    key : "countOfTotalItemsInCart",
    default : cart.count
})

export {
    cartCount
}