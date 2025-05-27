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
                <LikeIcon state={true} style={`text-[44px] hover:cursor-pointer active:scale-95`}></LikeIcon>
                <UserIcon style={`hover:cursor-pointer active:scale-95`}></UserIcon>
                <CartIcon fill={true} style={`w-10 active:scale-95 hover:cursor-pointer`}/>
            </div>
        </div>    
    )
}

export default TopBar;