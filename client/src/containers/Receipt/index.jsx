const ReceiptPage = ({cartItems}) => {

    console.log("cartItems", cartItems)

    return (
        <div className="receiptPage">
            <p>Thank you for your order!</p>
            <p>Order Number: #2350095</p>
            <div>
                {cartItems.map(item => (
                    <img style={{height: "200px"}} src={item.cover_pic} alt="" />
                ))}
            </div>
        </div>
    )
}

export default ReceiptPage