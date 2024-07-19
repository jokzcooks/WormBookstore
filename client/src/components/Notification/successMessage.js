import { useState, useEffect } from "react";
import { SuccessIcon } from "../Images";

export const SuccessMessage = ({onMount}) => {

    const [value, setValue] = useState("");
    const [processing, setProcessing] = useState(false)

    console.log(value)

    useEffect(() => {
      onMount([value, setValue]);
    }, [onMount, value]);
  
    if (processing == false && value != "" && value != undefined && document.querySelector(".successBox")) {
        setProcessing(true)
        document.querySelector(".successBox").style.top = "30px"
        setTimeout(() => {
            document.querySelector(".successBox").style.top = "-100%"
            setTimeout(() => {
                setValue("")    
                setProcessing(false)            
            }, 500);
        }, 2000);
    }

    return (
        <div className="successBox">
            <img src={SuccessIcon} alt="" />
            <p>{value}</p>
        </div>
    )
}