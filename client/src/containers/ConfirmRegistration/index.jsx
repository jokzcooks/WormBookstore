import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmRegistration = ({}) => {

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const returnTo = new URLSearchParams(location.search).get("returnTo");
        setTimeout(() => {
            if (returnTo) {
                navigate(returnTo)
            } else {
                navigate("/")
            }         
        }, 3000);
    }, [])
    

    return (

        <div style={{marginTop: "8%"}}>
            Successfully registered account! Redirecting...
        </div>

    )
}

export default ConfirmRegistration