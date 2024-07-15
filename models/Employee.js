const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
  employee_id: { 
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  }, // custom id (auto-generated or manually input)
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true },
  phone: String,
  position: { type: String, required: true },
  hire_date: { type: Date, default: Date.now },
  salary: Number,
  authorized: { type: Boolean, default: false }
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;
