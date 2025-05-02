import { useEffect } from "react";
const useOnClickOutside = (toggleButtonRef, ref, handler, clicked) => {
    function clickEventHandler(event){
        console.log(toggleButtonRef.current, event.target);
        
        if(clicked){
            if(toggleButtonRef.current == event.target || toggleButtonRef.current.contains(event.target)){
                handler(prev => !prev);
            }
            if(!ref.current.contains(event.target)){
                handler(prev => !prev);
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