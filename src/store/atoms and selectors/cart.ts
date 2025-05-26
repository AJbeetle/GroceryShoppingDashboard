import {atom, selector} from "recoil"

const cartCount = atom({
    key : "countOfTotalItemsInCart",
    default : 0
})

export {
    cartCount
}