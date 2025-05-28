
import {atom, selector} from "recoil"


// const likedCountAtom = atom ({
//     key : "LikeCount",
//     default : JSON.parse(localStorage.getItem("Like") as string)["count"]
// })


// const likedElementsAtom = atom({
//     key : "allLikedItems",
//     default : JSON.parse(localStorage.getItem("Like") as string)["items"]
// })

const likedCountAtom = atom ({
    key : "LikeCount",
    default : (()=>{
         try{
            const like = localStorage.getItem("Like");
            if(!like) return 0; // fallback if no like in storage, then likeCountAtom will have atomatically set to 0
            const likeObj = JSON.parse(like);
            return likeObj.count ?? 0; //fallback if likeObj does not have count key 
        }
        catch(e){
            console.error("Error parsing Like from localStorage:", e);
        }
    })()
})


const likedElementsAtom = atom({
    key : "allLikedItems",
    default : (()=>{
         try{
            const like = localStorage.getItem("Like");
            if(!like) return {}; // fallback if no like in storage, then likeElementAtom will have atomatically be empty object {}
            const likeObj = JSON.parse(like);
            return likeObj.items ?? {}; //fallback if likeObj does not have items key 
        }
        catch(e){
            console.error("Error parsing Like from localStorage:", e);
        }
    })()
})

export {
    likedCountAtom,
    likedElementsAtom
}