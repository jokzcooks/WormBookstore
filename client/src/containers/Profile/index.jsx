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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ userData, setUserData, logOut }) => {
    const navigator = useNavigate();
    const [editing, setEditing] = useState(false);
    const [profileDetails, setProfileDetails] = useState(userData || {});

    useEffect(() => {
        if (!userData) {
            navigator("/login?returnTo=/profile");
        } else if (userData.status === "inactive") {
            navigator("/confirmReg");
        }
    }, [userData, navigator]);

    const handleToggleEdit = () => {
        if (editing) {
            setUserData(profileDetails);
            setEditing(false);
        } else {
            setEditing(true);
        }
    };

    return (
        <div className="profileContainer">
            {userData ? (
                <div>
                    <h1>User Profile</h1>
                    {editing ? (
                        <div className="profileEdit">
                            <input type="text" value={profileDetails.first_name + ' ' + profileDetails.last_name} onChange={e => setProfileDetails({...profileDetails, first_name: e.target.value.split(' ')[0], last_name: e.target.value.split(' ')[1] || ''})}/>
                            <input type="email" value={profileDetails.email} onChange={e => setProfileDetails({...profileDetails, email: e.target.value})}/>
                            <input type="text" value={profileDetails.streetAddress} onChange={e => setProfileDetails({...profileDetails, streetAddress: e.target.value})}/>
                            <input type="text" value={profileDetails.city} onChange={e => setProfileDetails({...profileDetails, city: e.target.value})}/>
                            <input type="text" value={profileDetails.state} onChange={e => setProfileDetails({...profileDetails, state: e.target.value})}/>
                            <input type="text" value={profileDetails.zipCode} onChange={e => setProfileDetails({...profileDetails, zipCode: e.target.value})}/>
                            <input type="text" value={profileDetails.cardName} onChange={e => setProfileDetails({...profileDetails, cardName: e.target.value})}/>
                            <input type="password" value={profileDetails.cardNumber} onChange={e => setProfileDetails({...profileDetails, cardNumber: e.target.value})}/>
                            <input type="password" value={profileDetails.cardCVV} onChange={e => setProfileDetails({...profileDetails, cardCVV: e.target.value})}/>
                            <input type="month" value={profileDetails.cardExp} onChange={e => setProfileDetails({...profileDetails, cardExp: e.target.value})}/>
                            <button onClick={handleToggleEdit}>Save Changes</button>
                        </div>
                    ) : (
                        <div className="profileDisplay">
                            <p>Name: {profileDetails.first_name} {profileDetails.last_name}</p>
                            <p>Email: {profileDetails.email}</p>
                            <p>Address: {profileDetails.streetAddress}, {profileDetails.city}, {profileDetails.state} {profileDetails.zipCode}</p>
                            <p>Card Details: **** **** **** {profileDetails.cardNumber.slice(-4)}</p>
                            <button onClick={handleToggleEdit}>Edit Profile</button>
                        </div>
                    )}
                    <button onClick={logOut}>Logout</button>
                </div>
            ) : (
                <div>
                    <p className="alert">You are not logged in. Please log in to view your profile.</p>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;



