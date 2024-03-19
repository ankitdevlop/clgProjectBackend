const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const bodyParser =require('body-parser')
const User=require("./schema/register")
 const cors=require('cors')
app.use(bodyParser.json());
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
const atlasConnectionString = 'mongodb+srv://admin:admin@cluster0.v9dyg8p.mongodb.net/mydatabase?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(atlasConnectionString,
    console.log("Db is Connected"));
app.post("/register", async (req, res) => {
    try {
          const { name, email, password, phoneNumber } = req.body;
      const newUser = new User({
        name,
        email,
        password,
        phoneNumber
      });
  
      const savedUser = await newUser.save();
      res.status(200).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/users", async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ message: "User retrived successfully", users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})