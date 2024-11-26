require('dotenv').config();
const express = require ('express')
const app = express()
const cors = require('cors')
const path = require('path');
const mongoose = require( 'mongoose')
const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoute");
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors({
    origin: ' http://localhost:5173', // Change this to your frontend's URL if different
    credentials: true,
  }));

  
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

  app.use("/user",userRoute)
  app.use("/admin",adminRoute)

 


const PORT = process.env.PORT;  
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});