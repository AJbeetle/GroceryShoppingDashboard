
import {atom, selector} from "recoil"

const likesAtom = atom ({
    key : "allLikedProducts",
    default : 0
})

export {
    likesAtom
}