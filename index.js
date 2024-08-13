const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = 3000; 

const dbConnect = require('./Config/dbConfigration');
dbConnect.dbConnect();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoute = require('./Routes/userRoute');
app.use('/user', userRoute);

const taskRouter = require('./Routes/taskRoute');
app.use('/task', taskRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
