import type { ReactElement, ReactNode } from "react"

type SizeType = "sm" | "lg" | "xl";

function SearchBar({placeholder,Icon,size} : {placeholder:string,Icon:React.ElementType, size:SizeType}){
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
    return (
        <div className={` ${sizeOfSearch[size]} flex justify-between items-center bg-white-default text-gray-icon_normal px-4 py-2 rounded-2xl border-2 border-solid border-gray-stroke shadow-lg`}>
            <input placeholder={placeholder} className="bg-transparent w-full outline-none"></input>
            <div className="hover:cursor-pointer active:scale-95">
                {/* {icon} This is used when icon is accepted as ReactNode */}
                <Icon className={`${iconSize[size]} `}/>
            </div>
        </div>
    )
}

export default SearchBar