const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/UserModel');
const userRouter = require('./routes/userRoutes');
const employeeRouter = require('./routes/employeeRouter');
const cors = require('cors');
dotenv.config();
const app = express();

connectDB();
app.use(express.json());

const PORT = process.env.PORT || 5000;


const corsOptions = {
  origin:  process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello world');
});

  // "username": "admin",
  //   "password": "admin@123"
//  http://localhost:5000/api/users
// http://localhost:5000/api/login
app.use('/api', userRouter);
app.use('/api', employeeRouter);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
