import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmRegistration = ({tryConfirm}) => {

    const navigate = useNavigate()
    const location = useLocation()

    const [code, setCode] = useState("")

    const returnTo = new URLSearchParams(location.search).get("returnTo");

    useEffect(() => {
        if (code.length < 6) return
        const tryCon = async () => {
            const res = await tryConfirm(code)
            if (!res || res == false) setCode("")
            if (returnTo) {
                navigate(returnTo)
            } else {
                navigate("/")
            }         
        }
        tryCon()
    }, [code])

    return (

        <div className="confirmReg">
            <div>
                <h2>Complete Your Registration</h2>
                <p>Check your email for a confirmation code!</p>
                <form>
                    <input value={code} maxLength={6} onChange={e => setCode(e.target.value)} type="text" name="" id="" placeholder="123456" />
                </form>
            </div>

        </div>

    )
}

export default ConfirmRegistration