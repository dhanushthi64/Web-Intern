const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require('./model/user'); 
const Email = require("./Routes/email")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use("/formData",Email)

const secretkey = process.env.SECRET_KEY

mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(5000, () => {
      console.log('Server is listening on port 5000');
    });
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));