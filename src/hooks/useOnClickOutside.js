import { useEffect } from "react";
const useOnClickOutside = (toggleButtonRef, ref, handler, clicked) => {
    function clickEventHandler(event){
        if(clicked){
            if(toggleButtonRef.current == event.target || toggleButtonRef.current.contains(event.target)){
                handler();
            }
            if(!ref.current.contains(event.target)){
                handler();
            }
       }
     }
    useEffect(() => {
         document.addEventListener("mousedown", clickEventHandler)
        return () => {
            document.removeEventListener("mousedown", clickEventHandler);
        }
    }, [ref, handler, clicked, toggleButtonRef]);
}

export default useOnClickOutside;