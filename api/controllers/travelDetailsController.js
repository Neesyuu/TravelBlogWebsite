const TravelModel = require('../models/travelDetails');

const returnAllTravelDetails = async (req, res)=>{
    const travelData = await TravelModel.find();
    res.json(travelData);
}

const returnUserTravelDetails = async (req, res)=>{
    const userId = req.user;
    const travelData = await TravelModel.find({userId: userId});
    res.json(travelData);
}

const returnSingleTravelDetails = async (req, res)=>{
    const {travelDetailsID} = req.params;
    const selectedTravelDetails = await TravelModel.find({_id: travelDetailsID});
    if(selectedTravelDetails){
        res.json(selectedTravelDetails);
    }else{
        res.send("Index doesn't exist");
    }
}

const createTravel = async (req, res)=>{
    console.log(req, 16);
    console.log('req.params');
    console.log(req.body);
    try{
        const { title, location, tripDays, tripDescription, budget } = req.body;
        const images = req.files;
        const userId = req.user;
        console.log(userId)
        const data = { userId, title, location, tripDays, tripDescription, budget, images };
        const result = await TravelModel.create(data);
        console.log('New Trip Added Success');
        res.json(result);
    }catch(err){
        console.log('New Trip Added Failed');
        res.json(err);
    }
}

const updateTravel = async (req, res)=>{
    const {travelDetailsID} = req.params;
    console.log('req.params');
    console.log(req.params);
    console.log(req.files);
    try{
        const { title, location, tripDays, tripDescription, budget } = req.body;
        const userId = req.user;
        const dbUserAuth = await TravelModel.findById(travelDetailsID);
        let data = {};
        if(req.files.thumbnail && req.files.image){
            const images = req.files
            data = { title, location, tripDays, tripDescription, budget, images }
        }else if(req.files.thumbnail){
            const images = {thumbnail: req.files.thumbnail, image: dbUserAuth.images.image}
            data = { title, location, tripDays, tripDescription, budget, images }
        }else if(req.files.image){
            const images = {thumbnail: dbUserAuth.images.thumbnail, image: req.files.image}
            data = { title, location, tripDays, tripDescription, budget, images }
        }else{
            data = { title, location, tripDays, tripDescription, budget }
        }
        
        console.log('data from db')
        console.log(data)
        console.log('req.body')
        console.log(req.body)

        if(userId == dbUserAuth.userId){
            const result = await TravelModel.findByIdAndUpdate(travelDetailsID, data, {new: true});
            res.json(result);
        }else{
            res.json('You are not allowed.')
        }
    }catch(err){
        res.json(err);
    }
}

const deleteTravel = async (req, res)=>{
    const {travelDetailsID} = req.params;
    const userId = req.user;
    const dbUserAuth = await TravelModel.findById(travelDetailsID);
    try{
        if(userId == dbUserAuth.userId){
            const result = await TravelModel.findByIdAndDelete(travelDetailsID);
            res.json(result);
        }else{
            res.json('You are not allowed.')
        }
    }catch(err){
        res.json(err);
    }
}



module.exports = {returnAllTravelDetails, createTravel, updateTravel, deleteTravel, returnSingleTravelDetails, returnUserTravelDetails};