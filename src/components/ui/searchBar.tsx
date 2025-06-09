import {useState, useEffect} from "react"
import { searchResultAtom } from "../../store/atoms and selectors/items";
import { useSetRecoilState, useRecoilValue } from "recoil";

type SizeType = "sm" | "lg" | "xl";

function SearchBar({placeholder,Icon,size} : {placeholder:string,Icon:React.ElementType, size:SizeType}){
    const [search, setSearch] = useState("");
    const setResult = useSetRecoilState(searchResultAtom);
    const result = useRecoilValue(searchResultAtom);

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
        const InvDetails = JSON.parse(localStorage.getItem("InvDetails") as string);

        let matchedItems:any = new Set();

        Object.keys(InvDetails).forEach((e:string)=>{
            const keyArr:any = e.split(" ");
            const valueArr:any = InvDetails[e].split(" ");
            const searchValArr:any = val.trim().split(" ");

            keyArr.forEach((elem:string) => {
                searchValArr.forEach((vl:string)=> {
                    if(elem.toLowerCase().includes(vl.trim().toLowerCase())){
                        matchedItems.add(e);
                    }
                })
            } )

            if(!matchedItems.has(e)){
                valueArr.forEach((element:string)=>{
                    searchValArr.forEach((vl:string)=> {
                        if(element.toLowerCase().includes(vl.trim().toLowerCase())){
                            matchedItems.add(e);
                        }
                   })
                })
            }
        })

        const result = [...matchedItems];

        setResult(result as []);
        // console.log("))))))))))))))))))))))))))")
        // console.log(result)
        // console.log("))))))))))))))))))))))))))")
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
        <div className={`${sizeOfSearch[size]} flex flex-col justify-between items-center`}>
        <div className={`w-full flex justify-between items-center bg-white-default text-gray-icon_normal px-4 py-2 rounded-2xl border-2 border-solid border-gray-stroke shadow-lg`}>
            <input placeholder={placeholder} className="bg-transparent w-full outline-none" onChange={(e) => setSearch(e.target.value)}></input>
            <div className="hover:cursor-pointer active:scale-95">
                {/* {icon} This is used when icon is accepted as ReactNode */}
                <Icon className={`${iconSize[size]} `}/>
            </div>
        </div>
        {
            result.length==0 && search.length>0 ? <p className="mt-4">No Items Found</p> : null
        }
        
        </div>
    )
}

export default SearchBar