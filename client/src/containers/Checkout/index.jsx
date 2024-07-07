import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({userData, cartItems}) => {
    // Initialize state for form fields
    const navigate = useNavigate()
    const [formData, setFormData] = useState(userData);

    console.log(userData)
    console.log(formData)

    useEffect(() => {
        setFormData(userData)
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
        return cartItems.reduce((total, item) => total + item.sell_price * item.quantity, 0).toFixed(2);
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
                    <input type="month" name="expDate" placeholder="Expiration Date" required value={formData?.cardExp || ""} onChange={handleChange} />
                    <input type="number" name="cvv" placeholder="CVV" required value={formData?.cardCVV || ""} onChange={handleChange} />
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
                    <h3>Total: ${calculateTotal()}</h3>

                    <button className='placeOrder' type="submit">Place Order</button>

                </div>
            </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
