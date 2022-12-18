const express = require("express");
const router = express.Router();
const { requireAuth, roleCheck, fetchUser, checkUser } = require('../middleware/authMiddleware');
const {createUser, loginUser, logoutUser, getUser} = require('../controllers/authController');
const {returnAllTravelDetails, returnSingleTravelDetails, createTravel, updateTravel, deleteTravel} = require('../controllers/travelDetailsController');
const { returnComments, createComment, deleteComment } = require('../controllers/commentController');

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
router.get('/api/getUser', fetchUser, getUser);

router.get('/api/TravelDetails', returnAllTravelDetails);
router.post('/api/TravelDetails', requireAuth, roleCheck, createTravel);
router.get('/api/TravelDetails/:travelDetailsID', returnSingleTravelDetails);
router.patch('/api/TravelDetails/:travelDetailsID', requireAuth, roleCheck, updateTravel);
router.delete('/api/TravelDetails/:travelDetailsID', requireAuth, roleCheck, deleteTravel);

router.get('/api/comment/:travelId', returnComments);
router.post('/api/comment/', createComment);
router.delete('/api/comment/:commentId', requireAuth, roleCheck, deleteComment);

module.exports = router;