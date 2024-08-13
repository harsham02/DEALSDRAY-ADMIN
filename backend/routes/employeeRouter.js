const express = require('express');
const Employee = require('../models/EmployeeModel');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set up file upload handling with multer
const upload = multer({
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
});

// API route to create a new employee
router.post('/employees', upload.single('image'), async (req, res) => {
    try {
      const { name, email, phoneNumber, designation, gender, course } = req.body;
      const image = req.file ? req.file.filename : "abc.png";
  
     
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const newEmployee = new Employee({
        image,
        name,
        email,
        phoneNumber,
        designation,
        gender,
        course
      });
  
      await newEmployee.save();
      res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
      if (error.name === 'ValidationError') {
      
        const errorMessages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: 'Validation errors', errors: errorMessages });
      }
      console.error('Error creating employee:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// API route to get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error retrieving employees:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// API route to get a specific employee by ID
router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error retrieving employee:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// API route to update an employee
router.put('/employees/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, email, phoneNumber, designation, gender, course } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        image,
        name,
        email,
        phoneNumber,
        designation,
        gender,
        course
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    if (error.name === 'ValidationError') {
      
      const errorMessages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: errorMessages });
    }
    console.error('Error updating employee:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// API route to delete an employee
router.delete('/employees/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
  } catch (error) {
    console.error('Error deleting employee:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
