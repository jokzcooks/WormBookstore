import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RegisterPage = ({register}) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const location = useLocation()
    const returnTo = new URLSearchParams(location.search).get("returnTo");
    console.log(returnTo)

    const createAccount = async () => {
        console.log("Creating account!", firstName, lastName, email, password)
        const res = await register(firstName, lastName, email, password)
        if (res == true) navigate(`/confirmReg${returnTo ? "?returnTo=" + returnTo : ""}`)
    }

    return (
        <div className="loginPage">
            <form className="chokeLogin" onSubmit={e => createAccount()}>
                <p className="title">Register for a <span>Worm</span> Account</p>
                <div className="hr"></div>
                <div className="fullName">
                    <div>
                        <p className="label">First Name <span>*</span></p>
                        <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" name="" id="" placeholder="John" />
                    </div>
                    <div>
                        <p className="label">Full Name <span>*</span></p>
                        <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" name="" id="" placeholder="Doe" />
                    </div>
                </div>
                <p className="label">Email <span>*</span></p>
                <input value={email} onChange={e => setEmail(e.target.value)} type="text" name="" id="" placeholder="bookworm@gmail.com" />
                <p className="label">Password <span>*</span></p>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="" id="" placeholder="Password" />
                <button type="submit" className="login">Create Account</button>
            </form>
        </div>
    )
}

export default RegisterPage;