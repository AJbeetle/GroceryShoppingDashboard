import {useEffect, useState} from "react"
import { IoMdArrowDropup } from "react-icons/io";

function BackToTopButton(){
    const[visible, setVisible] = useState(false);

    useEffect(function(){
        function toggleVisibility(){
            if(window.scrollY>300){
                setVisible(true);
            }
            else{
                setVisible(false);
            }
        }

        window.addEventListener("scroll",toggleVisibility);
        return function(){
            window.removeEventListener("scroll",toggleVisibility);
        }

    },[])

    function scrollToTop(){
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    } 

    if(!visible) return null;

    return(
        <button onClick={scrollToTop} className="fixed bottom-20 right-10 z-50 px-4 py-2 bg-orange-base text-white-default rounded-full shadow-md active:scale-95 transition duration-300">
            <IoMdArrowDropup className="text-3xl"/> 
        </button>
    )
}

export default BackToTopButton