import React, { useCallback, useEffect, useRef, useState } from 'react';
import Book from "../Home/Book";
import { CloseIcon, Gradients } from "../Images";
import { useNavigate } from 'react-router-dom';
import useOutsideListener from './../../hooks/Scroll/useOutsideListener';

const Cart = ({ close, items, setCartItems }) => {

    const navigate = useNavigate()
    // Example cart items data - This should ideally come from props or global state


    // Collapse when clicked outside
    const containerRef = useRef(null);
    useOutsideListener(containerRef, useCallback(() => {
        console.log("outside click!")
        close()
    }, []));


    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    // Handler to update quantity in the cart
    const handleQuantityChange = (id, newQuantity) => {
        setCartItems(items.map(item =>
            item._id === id ? newQuantity > 0 ? { ...item, quantity: parseInt(newQuantity) } : null : item
        ));
    };

    return (
        <div ref={containerRef} className="cartContainer">
            <p>Your Cart</p>
            <img onClick={close} className="closeIcon" src={CloseIcon} alt="Close cart" />
            <div className="cartItems">
                {items && items.length > 0 ? (
                    items.map((book, index) => (
                        <div key={book._id} className="cartItem">
                            <div style={{backgroundImage: `url("${Gradients[index]}")`}} className="bookImageWrapper">
                                <img src={book.cover_pic} alt="" />
                            </div>
                            <div className="cartItemDetails">
                                <p className='title'>{book.title}</p>
                                <p className='author'>{book.author}</p>
                                <div className='reviews'>
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                </div>
                                <p><span>Price</span>{formatter.format(book.sell_price)}</p>
                                <p><span>Quantity</span><input
                                        type="number"
                                        max={book.qty_in_stock}
                                        value={book.quantity}
                                        onChange={(e) => handleQuantityChange(book._id, e.target.value)}
                                        style={{ width: "50px", marginLeft: "10px" }}
                                    />
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Cart is empty!</p>
                )}
            </div>
            <button className="cartCheckout" onClick={() => {navigate("/checkout"); close();}}>Checkout</button>
        </div>
    );
}

export default Cart;
