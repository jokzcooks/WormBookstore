import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RegisterPage = ({ register }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const returnTo = new URLSearchParams(location.search).get("returnTo");
    console.log(returnTo);

    const createAccount = async (e) => {
        e.preventDefault();
        console.log("Creating account!", firstName, lastName, email, phoneNumber, password);
        try {
            const res = await register(firstName, lastName, email, phoneNumber, password);
            if (res.status === 201) {
                navigate(res.redirectUrl);
            } else {
                alert(res.message || 'Registration failed');
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration. Please try again.");
        }
    };

    const applyPhonePattern = (val) => {
        var cleaned = val.replace(/[^0-9]/mg, "").substring(0, 10);
        return [cleaned.substring(0, 3), 
                cleaned.substring(3, 6), 
                cleaned.substring(6, 10)]
                .filter(c => c !== "")
                .join("-");
    };

    return (
        <div className="loginPage">
            <form className="chokeLogin" onSubmit={createAccount}>
                <p className="title">Register for a <span>Worm</span> Account</p>
                <div className="hr"></div>
                <div className="fullName">
                    <div>
                        <p className="label">First Name <span>*</span></p>
                        <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" name="" id="" placeholder="John" />
                    </div>
                    <div>
                        <p className="label">Last Name <span>*</span></p>
                        <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" name="" id="" placeholder="Doe" />
                    </div>
                </div>
                <p className="label">Email <span>*</span></p>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="" id="" placeholder="bookworm@gmail.com" />
                <p className="label">Phone Number <span>*</span></p>
                <input value={phoneNumber} onChange={e => setPhoneNumber(applyPhonePattern(e.target.value))} type="text" name="" id="" placeholder="123-123-1234" />
                <p className="label">Password <span>*</span></p>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="" id="" placeholder="Password" />
                <button type="submit" className="login">Create Account</button>
            </form>
        </div>
    );
};

export default RegisterPage;
