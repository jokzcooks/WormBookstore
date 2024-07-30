const mongoose = require('mongoose');

const customers = [
  {
    user_id: new mongoose.Types.ObjectId("64b6f657f4f1b5c4a0d983c2"),
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    role: "customer",
    phone: "555-1234",
    address: {
      street: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zip: '62701'
    },
    payment_cards: [
      {
        type: "Visa",
        number: "4111111111111111",
        expiry_date: new Date("2025-12-31")
      },
      {
        type: "MasterCard",
        number: "5500000000000004",
        expiry_date: new Date("2024-11-30")
      },
      {
        type: "American Express",
        number: "340000000000009",
        expiry_date: new Date("2026-10-29")
      },
    ],
    cart: {
      items: [
        { book_isbn: "978-0316015844", quantity: 2 },
        { book_isbn: "978-0553573428", quantity: 1 }
      ],
      total_price: 14.50
    },
    status: "active",
    verif_code: "abc123"
  },
  {
    user_id: new mongoose.Types.ObjectId("64b6f657f4f1b5c4a0d983c3"),
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    password: "password456",
    role: "customer",
    phone: "555-5678",
    address: {
      street: '789 Oak St',
      city: 'Springfield',
      state: 'GA',
      zip: '72703'
    },
    payment_cards: [
      {
        type: "Discover",
        number: "6011000000000004",
        expiry_date: new Date("2023-09-30")
      },
      {
        type: "Visa",
        number: "4111111111111111",
        expiry_date: new Date("2025-12-31")
      }
    ],
    status: "inactive",
    verif_code: "def456"
  },
  {
    user_id: new mongoose.Types.ObjectId("64b6f657f4f1b5c4a0d983c4"),
    first_name: "Bob",
    last_name: "Brown",
    email: "bob.brown@example.com",
    password: "password789",
    role: "customer",
    phone: "555-8765",
    address: {
      street: '456 Main Ave',
      city: 'Mayfair',
      state: 'NY',
      zip: '63713'
    },
    payment_cards: [
      {
        type: "MasterCard",
        number: "5500000000000004",
        expiry_date: new Date("2024-11-30")
      }
    ],
    status: "suspended",
    verif_code: "ghi789"
  },
  {
    user_id: new mongoose.Types.ObjectId("64b6f657f4f1b5c4a0d983c5"),
    first_name: "Alice",
    last_name: "White",
    email: "alice.white@example.com",
    password: "password101",
    role: "customer",
    phone: "555-4321",
    payment_cards: [
      {
        type: "American Express",
        number: "340000000000009",
        expiry_date: new Date("2026-10-29")
      }
    ],
    cart: {
      items: [
        { book_isbn: "978-0143127741", quantity: 2 },
        { book_isbn: "978-0451524935", quantity: 1 },
        { book_isbn: "978-0316769488", quantity: 2 }
      ],
      total_price: 14.50
    },
    status: "active",
    verif_code: "jkl101"
  },
  {
    user_id: new mongoose.Types.ObjectId("64b6f657f4f1b5c4a0d983c6"),
    first_name: "Tom",
    last_name: "Green",
    email: "tom.green@example.com",
    password: "password202",
    role: "customer",
    address: {
      street: '425 Cedar Dr.',
      city: 'Dublin',
      state: 'MN',
      zip: '63713'
    },
    cart: {
      items: [
        { book_isbn: "978-0553573428", quantity: 1 }
      ],
      total_price: 6.50
    },
    phone: "555-1212",
    status: "inactive",
    verif_code: "mno202"
  }
];

module.exports = customers;
