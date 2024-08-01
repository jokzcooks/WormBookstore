/* import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ProfilePage = ({userData, logOut}) => {

    const navigate = useNavigate()

    // useEffect(() => {
    //     if (userData == null) {
    //         navigate("/login?returnTo=/profile")
    //     }
    // }, [])
    
    useEffect(() => {
    if (!userData) {
        navigate("/login?returnTo=/profile");
    }
}, [userData, navigate]);

    const userDatas = {
        name: "John Smith"
    }

    return (
        <div className="profileContainer">
            {userData || userDatas ?
            <div>

            </div>
            :
            <div>
                <p className="warn">You're not logged in!</p>
            </div>}
        </div>
    )
}

export default ProfilePage
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ logOut , userData, setUserData}) => {
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [userDetails, setUserDetails] = useState(userData);
    console.log(userData)

    useEffect(() => {
        if (!userData || userData.email == "") {
            return navigate("/login?returnTo=/profile");
        }
        if (userData.status == "inactive") {
            return navigate("/confirmReg?returnTo=/profile")
        }
    }, [userData]);

    const toggleEditMode = () => {
        if (editMode) {
            setUserData(userDetails)
            setEditMode(false)
        } else {
            setEditMode(true)
        }
    };

    return (
        <div className="profileContainer">
            {userData ? (
                <div>
                    <h1>Profile</h1>
                    <div className="profileSettingsGroups">
                        <div className="profileSettingsContainer">
                            <h4 style={{marginBottom: "0px"}}>Personal Info</h4>
                            <p>Name</p>
                            <input type="text" disabled={!editMode ? "disabled" : ""} value={`${userDetails.first_name} ${userDetails.last_name}`} onBlur={e=>setUserData(userDetails)} onChange={e => setUserDetails({...userData, name: e.target.value})}/>
                            <p>Email</p>
                            <input type="email" disabled={"disabled"} value={userDetails.email} onBlur={e=>setUserData(userDetails)} onChange={e => setUserDetails({...userData, email: e.target.value})} />
                            <p>Password</p>
                            <input type="password" disabled={!editMode ? "disabled" : ""} value={userDetails.password} onBlur={e=>setUserData(userDetails)} onChange={e => setUserDetails({...userData, password: e.target.value})} />
                        </div>
                        <div className="profileSettingsContainer">
                            <h4 style={{marginBottom: "0px"}}>Shipping Info</h4>
                            <p>Street Address</p>
                            <input type="text" disabled={!editMode ? "disabled" : ""} value={userDetails.streetAddress} onBlur={e=>setUserData(userDetails)} onChange={e => setUserDetails({...userData, streetAddress: e.target.value})}/>
                            <p>City</p>
                            <input type="text" disabled={!editMode ? "disabled" : ""} value={userDetails.city} onBlur={e=>setUserData(userDetails)} onChange={e => setUserDetails({...userData, city: e.target.value})} />
                            <p>State</p>
                            <input type="text" disabled={!editMode ? "disabled" : ""} value={userDetails.state} onBlur={e=>setUserData(userDetails)} onChange={e => setUserDetails({...userData, state: e.target.value})} />
                            <p>Zip Code</p>
                            <input type="text" disabled={!editMode ? "disabled" : ""} value={userDetails.zipCode} onBlur={e=>setUserData(userDetails)} onChange={e => setUserDetails({...userData, zipCode: e.target.value})} />
                        </div>
                        <div className="profileSettingsContainer">
                            <h4 style={{marginBottom: "0px"}}>Payment Info</h4>
                            <p>Cardholder Name</p>
                            <input type="text" disabled={!editMode ? "disabled" : ""} value={userDetails.cardName} onBlur={e=>setUserData(userDetails)} onChange={e => setUserDetails({...userData, cardName: e.target.value})}/>
                            <p>Card Number</p>
                            <input type="password" disabled={!editMode ? "disabled" : ""} value={userDetails.cardNumber} onBlur={e=>setUserData(userDetails)} onChange={e => setUserDetails({...userData, cardNumber: e.target.value})} />
                            <p>CVV/CVC</p>
                            <input type="password" disabled={!editMode ? "disabled" : ""} value={userDetails.cardCVV} onBlur={e=>setUserData(userDetails)} onChange={e => setUserDetails({...userData, cardCVV: e.target.value})} />
                            <p>Expiration MM/YY</p>
                            <input type="month" disabled={!editMode ? "disabled" : ""} value={userDetails.cardExp} onBlur={e=>setUserData(userDetails)} onChange={e => setUserDetails({...userData, cardExp: e.target.value})} />
                        </div>
                    </div>
                    <div className="profileButtons">
                        {userData.admin == true && 
                            <button className="editProfile" onClick={e => navigate("/admin")}>Admin</button>
                        }
                        <button className="editProfile" onClick={e => logOut()}>Log Out</button>
                        <button className="editProfile" onClick={e => toggleEditMode()}>{editMode ? "Save Profile" : "Edit Profile"}</button>
                    </div>
                </div>
            ) : (
                <div>
                    <p className="warn">You're not logged in!</p>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;


