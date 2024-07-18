const mongoose = require('mongoose');

const employees = [
  {
    employee_id: new mongoose.Types.ObjectId(),
    first_name: 'Alice',
    last_name: 'Johnson',
    email: 'alice.johnson@example.com',
    phone: '555-2345',
    position: 'Sales Associate',
    hire_date: new Date('2022-01-15'),
    salary: 50000,
    authorized: true
  },
  {
    employee_id: new mongoose.Types.ObjectId(),
    first_name: 'Bob',
    last_name: 'Smith',
    email: 'bob.smith@example.com',
    phone: '555-6789',
    position: 'Software Engineer',
    hire_date: new Date('2021-03-22'),
    salary: 75000,
    authorized: true
  },
  {
    employee_id: new mongoose.Types.ObjectId(),
    first_name: 'Carol',
    last_name: 'Davis',
    email: 'carol.davis@example.com',
    phone: '555-9876',
    position: 'Product Manager',
    hire_date: new Date('2020-07-01'),
    salary: 55000,
    authorized: false
  },
  {
    employee_id: new mongoose.Types.ObjectId(),
    first_name: 'David',
    last_name: 'Martin',
    email: 'david.martin@example.com',
    phone: '555-1234',
    position: 'HR Specialist',
    hire_date: new Date('2021-09-30'),
    salary: 60000,
    authorized: true
  },
  {
    employee_id: new mongoose.Types.ObjectId(),
    first_name: 'Eve',
    last_name: 'Clark',
    email: 'eve.clark@example.com',
    phone: '555-4321',
    position: 'Marketing Coordinator',
    hire_date: new Date('2019-11-11'),
    salary: 45000,
    authorized: false
  }
];

module.exports = employees;
