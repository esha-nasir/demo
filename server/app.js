const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


app.use(cors());
app.use(express.json())


const JWT_SECRET = "djsdjnsjkcdndsn@#$%^&dsknvljkdcndks"

const CONNECTION_URL = 'mongodb://localhost:27017/demoDB';
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error)=> console.log(">>>>>>>>>>>",error.message));

app.post("/login", async(req, res) => {
console.log("WWWWWWWWWWWW");
  try{

  const { email, password } = req.body
  const user = await User.findOne({ email }).lean()
  
  if(!user){  
    return res.json({ status: 'error', error: 'Invalid Username/Password'})
  }

  if(await bcrypt.compare(password, user.password)){
    const token = jwt.sign({ id: user._id, email: user.email },{
      JWT_SECRET
    })
  
    return res.json({ status: 'ok', data: token})
  }
  res.json({ status: 'error', data: 'Coming Soon'})
 }catch(e){
   console.log("ERRORR",error.message);
 }
});

app.post("/register", async (req, res) => {
 
  try{

   const { displayName, email, password: plianTextPassword , cpassword } = req.body

   const password = await bcrypt.hash(plianTextPassword, 10);

  
    const response = await User.create({
      displayName,
      email,
      password,
      cpassword,
    });

    console.log("User Create Successfully", response);

  }catch(error){
    console.log(">>>>>>>",error.message);
    return res.json({ status: 'error' });
  }
  
  res.json({status: 'ok'});
});