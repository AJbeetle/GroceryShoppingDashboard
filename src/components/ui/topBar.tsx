import SearchBar from "./searchBar"
import CartIcon from "../icons/cart";
import LikeIcon from "../icons/like";
import SliderIcon from "../icons/slider";
import UserIcon from "../icons/user";

import { cartCountAtom } from "../../store/atoms and selectors/cart";
import { likedCountAtom } from "../../store/atoms and selectors/like";

import {useRecoilValue} from "recoil"

import {Link, useNavigate} from "react-router-dom"

function TopBar(){

    const likeElem = useRecoilValue(likedCountAtom);
    const cartElem = useRecoilValue(cartCountAtom);
    // const navigate = useNavigate();
     
    return (
        <div className="w-full flex items-center justify-around">

            {/* <p className="font-bold text-2xl hover:cursor-pointer active:scale-95" onClick={()=>navigate("/dashboard")}>
                GROCERIES
            </p> */}

            <Link to="/dashboard">
                <p className="font-bold text-2xl hover:cursor-pointer active:scale-95">
                    GROCERIES
                </p>
            </Link>
            {/* <SliderIcon className="bg-red-400"></SliderIcon> */}
            <SearchBar size = {"sm"} placeholder="Search" Icon={SliderIcon}></SearchBar>
            <div className="flex w-[15%] justify-around items-center gap-4 ">
                <div className="flex relative">
                    <LikeIcon state={true} style={`text-[46px] hover:cursor-pointer active:scale-95`}></LikeIcon>
                    {
                        likeElem > 0 ? 
                        <div className="flex justify-center items-center text-xs absolute -right-4 -top-3 bg-pink-notify text-white-default w-5 h-5 rounded-full">
                            {likeElem}
                        </div>  :
                        null
                    }
                    
                </div>
                <div>
                    <UserIcon style={`hover:cursor-pointer active:scale-95`}></UserIcon>
                </div>
                <div className="flex relative">
                    <Link to="/cart">
                        <CartIcon fill={true} style={`w-10 active:scale-95 hover:cursor-pointer`}/>
                    </Link>
                    {
                        cartElem > 0 ?
                        <div className="flex justify-center items-center text-xs absolute -right-4 -top-3 bg-blue-cart text-white-default w-5 h-5 rounded-full">
                            {cartElem}
                        </div> : 
                        null
                    }
                </div>
            </div>
        </div>    
    )
}

export default TopBar;