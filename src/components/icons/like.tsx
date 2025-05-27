import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";


function LikeIcon({style, state,}:{
    style?:string,
    state:boolean,
}){

    return (
        <>
            {
                state===true ? 
                <IoIosHeart className={`${style} active:scale-95 text-pink-like`}/> :
                <IoIosHeartEmpty className={`${style} text-gray-icon_light active:scale-95`}/>
            }
        </>
    )
}

export default LikeIcon