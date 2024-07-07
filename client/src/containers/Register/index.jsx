import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RegisterPage = ({login}) => {

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const location = useLocation()
    const returnTo = new URLSearchParams(location.search).get("returnTo");
    console.log(returnTo)
    const createAccount = () => {
        login()
        navigate(`/confirmReg${returnTo ? "?returnTo=" + returnTo : ""}`)
    }

    return (
        <div className="loginPage">
            <div className="chokeLogin">
                <p className="title">Register for a <span>Worm</span> Account</p>
                <div className="hr"></div>
                <p className="label">Full Name <span>*</span></p>
                <input value={fullName} onChange={e => setFullName(e.target.value)} type="text" name="" id="" placeholder="bookworm@gmail.com" />
                <p className="label">Email <span>*</span></p>
                <input value={email} onChange={e => setEmail(e.target.value)} type="text" name="" id="" placeholder="bookworm@gmail.com" />
                <p className="label">Password <span>*</span></p>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="" id="" placeholder="Password" />
                <button onClick={e => createAccount()} className="login">Create Account</button>
            </div>
        </div>
    )
}

export default RegisterPage;