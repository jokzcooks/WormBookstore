const mongoose = require('mongoose');

const admins = [
  {
    user_id: new mongoose.Types.ObjectId("64b6f657f4f1b5c4a0d983c1"),
    first_name: "Admina",
    last_name: "Admin",
    email: "admin.admina@example.com",
    password: "adminpass",
    role: "admin",
    admin: true
  },
  {
    user_id: new mongoose.Types.ObjectId("64b6f657f4f1b5c4a0d983c7"),
    first_name: "Admino",
    last_name: "Amin",
    email: "admino.amin@example.com",
    password: "adminpass2",
    role: "admin",
    admin: true
  }
];

module.exports = admins;
