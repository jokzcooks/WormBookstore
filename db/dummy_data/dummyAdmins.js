const mongoose = require('mongoose');

const admins = [
  {
    user_id: new mongoose.Types.ObjectId("64b6f657D0f1b5c4a0d983c1"),
    first_name: "Admin",
    last_name: " ",
    email: "admin@worm.com",
    password: "password",
    role: "admin",
    admin: true
  },
  {
    user_id: new mongoose.Types.ObjectId("64b6f657f4f1b5c4a0d983c1"),
    first_name: "Admina",
    last_name: "Admin",
    email: "adminadmina@example.com",
    password: "adminpass",
    role: "admin",
    admin: true
  },
  {
    user_id: new mongoose.Types.ObjectId("64b6f657f4f1b5c4a0d983c7"),
    first_name: "Admino",
    last_name: "Amin",
    email: "adminoamin@example.com",
    password: "adminpass2",
    role: "admin",
    admin: true
  }
];

module.exports = admins;
