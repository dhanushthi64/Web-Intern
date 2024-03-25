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
app.use("/api",Email)

const secretkey = process.env.SECRET_KEY

app.post("/formData",(req,res)=>{
    const {name,email} = req.body
   
    const newUser = new User({
        name: name,
        email: email
      });
      
      newUser.save()
        .then((user) => {
          console.log('User created successfully:', user);
          const token = jwt.sign({userId : user._id},secretkey,{expiresIn : '1h'})
          res.redirect(`/api?token=${token}`)
        })
        .catch((err) => {
          console.error('Error creating user:', err);
        });
})
mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(5000, () => {
      console.log('Server is listening on port 5000');
    });
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));