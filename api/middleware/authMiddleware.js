const User = require('../models/user');
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next)=>{
    const {jwt: token} = req.cookies;
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
    const {jwt: token} = req.cookies;
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

const roleCheck = (req, res, next)=>{
    const {jwt: token} = req.cookies;
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


module.exports = {requireAuth, checkUser, roleCheck};