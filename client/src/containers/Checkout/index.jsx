import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({userData, cartItems}) => {
    // Initialize state for form fields
    console.log("Userdata: ", userData)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        ...userData,
        name: `${userData.first_name} ${userData.last_name}`
    });
    const [promoCode, setPromoCode] = useState("")
    const [promotion, setPromotion] = useState({})

    console.log(userData)
    console.log("formData:", formData)


    // useEffect(() => {
    //     calculateTotal()
    // }, [promotion])

    const sendConfirmationEmail = async (name) =>{
        try {
            const res = await fetch("http://localhost:5000/api/order/emailOrder", {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    total: calculateTotal()
                })
            })
        } catch {

        }
    }

    const fetchPromotion = async (name) =>{
        try {
            var result = await fetch(`http://localhost:5000/api/promotion/${name}`, { method: 'GET' });
            setPromotion(result)
        } catch {

        }
    }

    useEffect(() => {
        fetchPromotion(promoCode)
    }, [promoCode])
    useEffect(() => {
        setFormData({
            ...userData,
            name: `${userData.first_name} ${userData.last_name}`
        })
        if (!cartItems || cartItems.length == 0) navigate("/")
    }, [userData])

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the form submission to your backend
        console.log("Checkout Data:", formData);
        // alert("Checkout successful!");
        navigate("/receipt")
    };

    // Calculate the total cost of the cart
    const calculateTotal = () => {
        var total = cartItems.reduce((total, item) => total + item.sell_price * item.quantity, 0).toFixed(2);
        console.log(total)
        if (promotion) return Number(total)*0.5
        return total
    };

    return (
        <div className="checkoutPage">
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
            <div className="profileSettingsGroups">
                <div className="profileSettingsContainer">
                    <h4 style={{marginBottom: "0px"}}>Billing Information</h4>
                    <input type="text" name="fullName" placeholder="Full Name" required value={formData?.name || ""} onChange={handleChange} />
                    <input type="email" name="email" placeholder="Email" required value={formData?.email || ""} onChange={handleChange} />
                    <input type="text" name="address" placeholder="Address" required value={formData?.streetAddress || ""} onChange={handleChange} />
                    <input type="text" name="city" placeholder="City" required value={formData?.city || ""} onChange={handleChange} />
                    <input type="text" name="state" placeholder="State/Province" required value={formData?.state || ""} onChange={handleChange} />
                    <input type="text" name="postalCode" placeholder="Postal Code" required value={formData?.zipCode || ""} onChange={handleChange} />
                </div>
                <div className="profileSettingsContainer">
                    <h4 style={{marginBottom: "0px"}}>Payment Info</h4>
                    <input type="text" name="cardName" placeholder="Card Holder Name" required value={formData?.cardName || ""} onChange={handleChange} />
                    <input type="text" name="cardNumber" placeholder="Card Number" required value={formData?.cardNumber || ""} onChange={handleChange} />
                    <input type="month" name="cardExp" placeholder="Expiration Date" required value={formData?.cardExp || ""} onChange={handleChange} />
                    <input type="number" name="cardCVV" placeholder="CVV" required value={formData?.cardCVV || ""} onChange={handleChange} />
                </div>
                <div className="profileSettingsContainer">
                    <h2>Order Summary</h2>
                    {cartItems.map(item => {
                        console.log(item)

                        return (
                        <div key={item.id} className="orderItem">
                            <p>{item.title} - {item.quantity} x ${item.sell_price}</p>
                        </div>
                    )})}
                    <h3>Total: ${Number(calculateTotal())}</h3>

                    <input onChange={e => setPromoCode(e.target.value)} type="text" placeholder='Promo Code'/>

                    <button onClick={e => sendConfirmationEmail()} className='placeOrder' type="submit">Place Order</button>

                </div>
            </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
