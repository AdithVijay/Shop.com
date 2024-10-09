require('dotenv').config();
const express = require ('express')
const app = express()
const cors = require('cors')
const path = require('path');
const mongoose = require( 'mongoose')
const userRoute = require("./routes/userRoutes");

app.use(cors({
    origin: ' http://localhost:5173', // Change this to your frontend's URL if different
    credentials: true,
  }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

  app.use("/user",userRoute)



const PORT = process.env.PORT;  
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});