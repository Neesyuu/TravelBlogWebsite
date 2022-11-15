const express = require("express");
const router = express.Router();
const { requireAuth, roleCheck } = require('../middleware/authMiddleware');
const {createUser, loginUser, logoutUser} = require('../controllers/authController');
const {returnAllTravelDetails, returnSingleTravelDetails, createTravel, updateTravel, deleteTravel} = require('../controllers/travelDetailsController');

router.get('/', (req, res)=>{
    const user = res.locals.user;
    if(user != null){
        console.log(`HomePage as ${user.name}`);
    }else{
        console.log('You are Anonymous Person.')
    }
    res.send("hello World");
});

router.post('/api/signup', createUser);
router.post('/api/login', loginUser);
router.get('/api/logout', logoutUser);

router.get('/api/TravelDetails', returnAllTravelDetails);
router.post('/api/TravelDetails', requireAuth, roleCheck, createTravel);
router.get('/api/TravelDetails/:travelDetailsID', returnSingleTravelDetails);
router.patch('/api/TravelDetails/:travelDetailsID', requireAuth, roleCheck, updateTravel);
router.delete('/api/TravelDetails/:travelDetailsID', requireAuth, roleCheck, deleteTravel);

module.exports = router;