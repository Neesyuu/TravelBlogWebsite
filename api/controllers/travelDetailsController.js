const TravelModel = require('../models/travelDetails');

const returnAllTravelDetails = async (req, res)=>{
    const travelData = await TravelModel.find();
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
        const { title, tripDays, tripDescription, budget } = req.body;
        const author = res.locals.user.name;
        const edited = res.locals.user.name;
        const data = { title, tripDays, tripDescription, budget, author, edited }
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
        const { title, tripDays, tripDescription, budget } = req.body;
        const edited = res.locals.user.name;
        const data = { title, tripDays, tripDescription, budget, edited }
        const result = await TravelModel.findByIdAndUpdate(travelDetailsID, data, {new: true});
        res.json(result);
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



module.exports = {returnAllTravelDetails, createTravel, updateTravel, deleteTravel, returnSingleTravelDetails};