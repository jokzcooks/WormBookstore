const express = require('express');
const router = express.Router();
const Employee = require('../../db/models/Employee'); 

// @route   POST api/employee
// Create a new employee
router.post('/', async (req, res) => {
  const employee = new Employee({
    ...req.body
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   GET api/employee
// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/employee/employee_id/:employee_id
// Get employee by employee_id
router.get('/employee_id/:employee_id', async (req, res) => {
  try {
    const employee = await Employee.findOne({ employee_id: req.params.employee_id });
    if (!employee) {
      return res.status(404).json({ message: 'Cannot find employee' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/employee/:id
// Get employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Cannot find employee' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT api/employee/:id
// Update an employee
router.put('/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Cannot find employee' });
    }
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE api/employee/:id
// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Cannot find employee' });
    }
    res.json({ message: 'Deleted employee' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
