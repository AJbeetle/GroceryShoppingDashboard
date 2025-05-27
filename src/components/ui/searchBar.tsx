import type { ReactElement, ReactNode} from "react"
import {useState, useEffect} from "react"
import { searchResultAtom } from "../../store/atoms and selectors/items";
import { useSetRecoilState } from "recoil";

type SizeType = "sm" | "lg" | "xl";

function SearchBar({placeholder,Icon,size} : {placeholder:string,Icon:React.ElementType, size:SizeType}){
    const [search, setSearch] = useState("");
    const setResult = useSetRecoilState(searchResultAtom);

    const sizeOfSearch:Record<SizeType,string> = {
        "sm" : `w-[60%] text-lg`,
        "lg" : `w-[70%] text-xl`,
        "xl" : `w-[90%] text-2xl`
    }

    const iconSize = {
        "sm" : `text-3xl`,
        "lg" : `text-6xl`,
        "xl" : `text-5xl`
    }

    // function findResult(val:string){
    //     // let matchedItems:Array<string> = [];
    //     let matchedItems:any= [];
    //     const InvItemsList = Object.keys(JSON.parse(localStorage.getItem("Inventory") as string));
    //     InvItemsList.filter((el:string)=>{
    //         if(el.toLowerCase().includes(val.toLowerCase())){
    //             matchedItems.push(el);
    //         }
    //     })
    //     // setResult(matchedItems as []);
    //     setResult(matchedItems);
    //     return;
        
    // }
    function findResult(val:string){
        if(val.trim()===""){
            setResult([]);
            return;
        }
        const InvItemsList = Object.keys(JSON.parse(localStorage.getItem("Inventory") as string));
        let matchedItems = InvItemsList.filter((el:string)=>el.toLowerCase().includes(val.toLowerCase()));
        setResult(matchedItems as []);
        return;
        
    }

    useEffect(function(){
        const timer = setTimeout(function(){
            findResult(search);
        },500)

        return function(){
            clearTimeout(timer);
        }
    },[search])

    


    return (
        <div className={` ${sizeOfSearch[size]} flex justify-between items-center bg-white-default text-gray-icon_normal px-4 py-2 rounded-2xl border-2 border-solid border-gray-stroke shadow-lg`}>
            <input placeholder={placeholder} className="bg-transparent w-full outline-none" onChange={(e) => setSearch(e.target.value)}></input>
            <div className="hover:cursor-pointer active:scale-95">
                {/* {icon} This is used when icon is accepted as ReactNode */}
                <Icon className={`${iconSize[size]} `}/>
            </div>
        </div>
    )
}

export default SearchBar