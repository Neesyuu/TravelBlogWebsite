const User = require('../models/user');
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next)=>{
    const token = req.header('token');
    // const {jwt: token} = req.cookies;
    if(token){
        const isValid = jwt.verify(token, process.env.JWT_SECRET);
        if(isValid){
            console.log('Auth pass');
            next();
        }else{
            res.redirect('/api/login');
        }
    }else{
        res.redirect('/api/login');
    }
};

const checkUser = (req, res, next)=>{
    const token = req.header('token');
    // const {jwt: token} = req.cookies;
    res.locals.user = null;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, async(err, decoded)=>{
            if(err) next();
            const user = await User.findById(decoded.user);
            res.locals.user = user;        
            next();
        })
    }else{
        next();
    }
}


const fetchUser = (req, res, next)=>{
    const token = req.header('token');
    // const {jwt: token} = req.cookies;
    if(token){
        try{
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data.user;
            console.log('user fetch pass')
            next();
        }catch(error){
            res.status(401).send({ error: "Please authenticate using a valid token" });
        }
    }else{
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}


const roleCheck = (req, res, next)=>{
    const token = req.header('token');
    // const {jwt: token} = req.cookies;
    if(token){
        const isValid = jwt.verify(token, process.env.JWT_SECRET);
        if(isValid){
            const role = res.locals.user.role;
            if(role == 'editor'){
                next();
            }else{
                res.json('Not permitted.');
            }
        }else{
            res.redirect('/api/login');
        }
    }else{
        res.redirect('/api/login');
    }
};


module.exports = {requireAuth, checkUser, roleCheck, fetchUser};