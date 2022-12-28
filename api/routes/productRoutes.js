const express = require("express");
const router = express.Router();
const multer = require('multer');
let path = require('path');
const { requireAuth, roleCheck, fetchUser, checkUser } = require('../middleware/authMiddleware');
const {createUser, loginUser, logoutUser, getUser} = require('../controllers/authController');
const {returnAllTravelDetails, returnSingleTravelDetails, createTravel, updateTravel, deleteTravel, returnUserTravelDetails} = require('../controllers/travelDetailsController');
const { returnComments, createComment, deleteComment } = require('../controllers/commentController');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('req.body');
        console.log(req.user);
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

let upload = multer({ storage: storage });

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
router.get('/api/myStory', fetchUser, returnUserTravelDetails);
// router.post('/api/TravelDetails', requireAuth, fetchUser, thumbUp.single('thumbnail', 12), upload.array('image', 12), createTravel);
router.post('/api/TravelDetails', requireAuth, fetchUser, upload.fields([{name: 'thumbnail', maxCount: 1},{name: 'image', maxCount: 12}]), createTravel);
router.get('/api/TravelDetails/:travelDetailsID', returnSingleTravelDetails);
router.patch('/api/TravelDetails/:travelDetailsID', requireAuth, fetchUser, upload.fields([{name: 'thumbnail', maxCount: 1},{name: 'image', maxCount: 12}]), updateTravel);
router.delete('/api/TravelDetails/:travelDetailsID', requireAuth, fetchUser, deleteTravel);

router.get('/api/comment/:travelId', returnComments);
router.post('/api/comment/', createComment);
router.delete('/api/comment/:commentId', requireAuth, fetchUser, deleteComment);

module.exports = router;