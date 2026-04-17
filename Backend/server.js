require('dotenv').config();
const express= require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const user=require('./model/authModel');
const userRoutes=require('./routes/authRoute');
const productRoutes=require('./routes/productRoute');
const app=express();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.Mongo_URL)
 .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use('/users', userRoutes);
app.use('/products', productRoutes);




const Port=3000;
app.listen(Port,()=>{
console.log(`Server is running on http://localhost:${Port}`);
});