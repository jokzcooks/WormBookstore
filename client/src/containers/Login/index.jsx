import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = ({login, forgot}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const location = useLocation()
    const returnTo = new URLSearchParams(location.search).get("returnTo");
    console.log(returnTo)

    const register = () => {
        if (returnTo) {
            navigate(`/register${returnTo ? "?returnTo=" + returnTo : ""}`)
        } else {
            navigate(`/register`)
        }
    }

    const tryLogin = async () => {
        const res = await login(email, password, true)
        console.log(res)
        if (res == true) {
            if (returnTo) {
                navigate(returnTo)
            } else {
            navigate("/home")
            }
        }
    }

    const forgotPassword = () => {
        console.log("Callign forgot password!", forgot)
        forgot(email)
    }

    return (
        <div className="loginPage">
            <div className="chokeLogin">
                <p className="title">Log in to your <span>Worm</span> Account</p>
                <div className="hr"></div>
                {
                    returnTo &&
                    <p className="warning">You must log in to view this page!</p>
                }
                <p className="label">Email <span>*</span></p>
                <input value={email} onChange={e => setEmail(e.target.value)} type="text" name="" id="" placeholder="bookworm@gmail.com" />
                <p className="label">Password <span>*</span></p>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="" id="" placeholder="Password" />
                <button onClick={e => tryLogin()} className="login">Log In</button>
                <span onClick={e => register()} className="create">or Create Account</span>
                <span style={{color: "grey"}} onClick={e => forgotPassword()} className="create">Forgot Password?</span>
            </div>
        </div>
    )
}

export default LoginPage;