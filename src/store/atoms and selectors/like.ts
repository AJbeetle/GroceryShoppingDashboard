
import {atom, selector} from "recoil"


const likedCountAtom = atom ({
    key : "LikeCount",
    default : JSON.parse(localStorage.getItem("Like") as string)["count"]
})


const likedElementsAtom = atom({
    key : "allLikedItems",
    default : JSON.parse(localStorage.getItem("Like") as string)["items"]
})

export {
    likedCountAtom,
    likedElementsAtom
}