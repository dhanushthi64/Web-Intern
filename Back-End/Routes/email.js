const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../model/user")
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config()

const secretkey = process.env.SECRET_KEY

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: ["greencrystal1975@gmail.com"],
    subject: "Sending email using nodemailer and gmail",
    text: "Hello World",
    html: "<b>What's up</b>",
    // attachments: [
    //   {
    //     filename: "dummy.pdf",
    //     path: path.join(__dirname, "dummy.pdf"),
    //     contentType: "application/pdf",
    //   },
    //   {
    //     filename: "test.png",
    //     path: path.join(__dirname, "test.png"),
    //     contentType: "image/png",
    //   },
    //   // {
    //   //   filename: "test1.jpeg",
    //   //   path: path.join(__dirname, "test1.jpeg"),
    //   //   contentType: "image/jpeg",
    //   // },
    //   {
    //     filename: "sample.mp4",
    //     path: path.join(__dirname, "sample.mp4"),
    //     contentType: "video/mp4",
    //   },
    // ],
  };
  

router.post("/",async(req,res)=>{
    const {name,email} = req.body
   
    const newUser = new User({
        name: name,
        email: email
      });
      
      newUser.save()
        .then((user) => {
          console.log('User created successfully:', user);
          mailOptions.to= [user.email]
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'Email sent successfully' });
        }
    });
          
        })
        .catch((err) => {
          console.error('Error creating user:', err);
        });
    
})

module.exports = router

// try{
//     const token = req.query.token
//     console.log(token)
//     const decodeToken = jwt.verify(token,secretkey)
//     const userId = decodeToken.userId
//     const user = await User.findById(userId)
    
//     }
//     catch(error){
//         res.json(error)
//     }