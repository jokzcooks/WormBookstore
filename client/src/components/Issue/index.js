import { useState, useEffect } from "react";
import { ErrorIcon } from "../Images";

export const ErrorMessage = ({onMount}) => {

    const [value, setValue] = useState("");
    const [processing, setProcessing] = useState(false)

    console.log(value)

    useEffect(() => {
      onMount([value, setValue]);
    }, [onMount, value]);
  
    if (processing == false && value != "" && value != undefined && document.querySelector(".errorBox")) {
        setProcessing(true)
        document.querySelector(".errorBox").style.top = "30px"
        setTimeout(() => {
            document.querySelector(".errorBox").style.top = "-100%"
            setTimeout(() => {
                setValue("")    
                setProcessing(false)            
            }, 500);
        }, 2000);
    }

    return (
        <div className="errorBox">
            <img src={ErrorIcon} alt="" />
            <p>{value}</p>
        </div>
    )
}