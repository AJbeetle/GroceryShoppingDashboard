import SearchBar from "./searchBar"
import CartIcon from "../icons/cart";
import LikeIcon from "../icons/like";
import SliderIcon from "../icons/slider";
import UserIcon from "../icons/user";


function TopBar(){
    return (
        <div className="w-full flex items-center justify-around">
            <p className="font-bold text-2xl">
                GROCERIES
            </p>
            {/* <SliderIcon className="bg-red-400"></SliderIcon> */}
            <SearchBar size = {"sm"} placeholder="Search" Icon={SliderIcon}></SearchBar>
            <div className="flex w-[15%] justify-around items-center gap-4 ">
                <div className="flex relative">
                    <LikeIcon state={true} style={`text-[46px] hover:cursor-pointer active:scale-95`}></LikeIcon>
                    <div className="flex justify-center items-center text-xs absolute -right-4 -top-3 bg-pink-notify text-white-default w-5 h-5 rounded-full">
                        {JSON.parse(localStorage.getItem("Like") as string )["count"]}
                    </div>
                </div>
                <div>
                    <UserIcon style={`hover:cursor-pointer active:scale-95`}></UserIcon>
                </div>
                <div className="flex relative">
                    <CartIcon fill={true} style={`w-10 active:scale-95 hover:cursor-pointer`}/>
                    <div className="flex justify-center items-center text-xs absolute -right-4 -top-3 bg-blue-cart text-white-default w-5 h-5 rounded-full">
                        {JSON.parse(localStorage.getItem("Cart") as string )["count"]   }
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default TopBar;