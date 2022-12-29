const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require('validator');

const handleErrors = (err) => {
  const errors = {
    email: "",
    password: "",
  };
  if (err.message === "incorrect email") {
    errors.email = "Email is incorrect";
    return errors;
  }
  if (err.message === "incorrect password") {
    errors.password = "Password is incorrect";
    return errors;
  }
  if (err.code === 11000) {
    errors.email = "Email already exists";
    return errors;
  }
  if (err._message === "User validation failed") {
    Object.values(err.errors).map(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("jwt", token);
    res.json({ user: user._id, jwt: token, userName: user.name });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors: errors });
  }
};

const loginUser = async(req, res)=>{
  const {email, password} = req.body;
  try{
    const user = await User.findOne({email});
    if(user){
      const passwordMatch = await bcrypt.compare(password, user.password);
      if(passwordMatch){
        const token = jwt.sign({user: user._id}, process.env.JWT_SECRET, {expiresIn: '1d',});
        console.log('You are logged in')
        res.cookie('jwt', token);
        res.json({ jwt: token });
      }else{
        res.json({errors: 'Incorrect Credentials'});
        // throw Error('Incorrect Password');
      }
    }else{
      res.json({errors: 'Email Not Found'});
      // throw Error('Incorrect Email');
    }
  }catch(err){
    const errors = handleErrors(err);
    res.json({errors : errors});
  }
}


const logoutUser = (req, res)=>{
  const user = res.locals.user;
  if(user != null){  
    console.log(`Bye ${user.name}`);
  }
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/');
}


const getUser = async(req, res)=>{
  try{
    const userID = req.user;
    const user = await User.findById(userID).select("-password");
    res.json(user);
  }catch(err){
    res.json({errors : err});
  }
}

const changeUsername = async(req, res)=>{
  try{
    console.log('i am here')
    console.log(req.body);
    const userID = req.user;
    console.log('userID');
    console.log(userID);
    const user = await User.findByIdAndUpdate(userID, req.body, {new: false});
    res.json(user);
  }catch(err){
    res.json({errors: err});
  }
}

const changePassword = async(req, res)=>{
  const userID = req.user;
  const { oldpassword, newpassword } = req.body;
  try{
    const user = await User.findById(userID);
    if(user){
      const passwordMatch = await bcrypt.compare(oldpassword, user.password);
      if(passwordMatch){
        const salt = await bcrypt.genSalt();
        const data = { password : await bcrypt.hash(newpassword, salt)};
        await User.findByIdAndUpdate(userID, data, {new: false});
        res.json({success: 'Password is Changed'});
      }else{
        res.json({errors: 'Incorrect Credentials'});
      }
    }else{
      res.json({errors: 'Incorrect Credentials'});
    }
  }catch(err){
    res.json({errors: err});
  }
}


module.exports = {
  loginUser, createUser, logoutUser, getUser, changeUsername, changePassword,
}