const mongoose = require('mongoose');

const orders = [
    {
        order_id: new mongoose.Types.ObjectId(),
        customer_id: new mongoose.Types.ObjectId("64b6f657f4f1b5c4a0d983c2"),
        order_datetime: new Date(),
        confirm_no: "CONF123456",
        promo_code: "PROMO2023", // Assuming this promo code exists
        total_price: 50.00,
        order_status: "confirmed",
        pay_type: "credit_card",
        items: [
            { book_isbn: "978-0316015844", quantity: 2 },
            { book_isbn: "978-0553573428", quantity: 1 }
        ]
    },
    {
        order_id: new mongoose.Types.ObjectId(),
        customer_id: new mongoose.Types.ObjectId("64b6f657f4f1b5c4a0d983c3"),
        order_datetime: new Date(),
        confirm_no: "CONF123457",
        promo_code: "SUMMER2023", // Assuming this promo code exists
        total_price: 30.00,
        order_status: "shipped",
        pay_type: "credit_card",
        items: [
            { book_isbn: "978-0451524935", quantity: 1 },
            { book_isbn: "978-0316769488", quantity: 1 }
        ]
    },
    {
        order_id: new mongoose.Types.ObjectId(),
        customer_id: new mongoose.Types.ObjectId("64b6f657f4f1b5c4a0d983c4"),
        order_datetime: new Date(),
        confirm_no: "CONF123458",
        total_price: 20.00,
        order_status: "delivered",
        pay_type: "cash_on_delivery",
        items: [
            { book_isbn: "978-0316015844", quantity: 1 }
        ]
    },
    {
        order_id: new mongoose.Types.ObjectId(),
        customer_id: new mongoose.Types.ObjectId("64b6f657f4f1b5c4a0d983c5"),
        order_datetime: new Date(),
        confirm_no: "CONF123459",
        total_price: 45.00,
        order_status: "confirmed",
        pay_type: "credit_card",
        items: [
            { book_isbn: "978-0316015844", quantity: 1 },
            { book_isbn: "978-0316769488", quantity: 2 }
        ]
    },
    {
        order_id: new mongoose.Types.ObjectId(),
        customer_id: new mongoose.Types.ObjectId("64b6f657f4f1b5c4a0d983c6"),
        order_datetime: new Date(),
        confirm_no: "CONF123460",
        promo_code: "SUMMER2023", // Assuming this promo code exists
        total_price: 25.00,
        order_status: "shipped",
        pay_type: "cash_on_delivery",
        items: [
            { book_isbn: "978-0553573428", quantity: 1 },
            { book_isbn: "978-0451524935", quantity: 1 }
        ]
    }
];

module.exports = orders;
