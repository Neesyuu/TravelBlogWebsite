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
    try{
        const { title, location, tripDays, tripDescription, budget } = req.body;
        const userId = req.user;
        console.log(userId)
        const data = { userId, title, location, tripDays, tripDescription, budget };
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
    try{
        const { title, location, tripDays, tripDescription, budget } = req.body;
        const data = { title, location, tripDays, tripDescription, budget }
        const userId = req.user;
        const dbUserAuth = await TravelModel.findById(travelDetailsID);
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
    try{
        const result = await TravelModel.findByIdAndDelete(travelDetailsID);
        res.json(result);
    }catch(err){
        res.json(err);
    }
}



module.exports = {returnAllTravelDetails, createTravel, updateTravel, deleteTravel, returnSingleTravelDetails, returnUserTravelDetails};