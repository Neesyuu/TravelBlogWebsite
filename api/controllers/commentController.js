const CommentModel = require('../models/commentDetails');

const returnComments = async (req, res)=>{
    const travelId = req.params;
    const commentData = await CommentModel.find({travelId: travelId.travelId});
    if(commentData){
        res.json(commentData);
    }else{
        res.send("Index doesn't exist");
    }
}

const createComment = async (req, res)=> {
    try{
        // const { travelId, fullname, email, userComment, display } = req.body;
        const result = await CommentModel.create(req.body);
        res.json(result);
    }catch(err){
        console.log('Comment Failed');
        res.json(err);
    }
}

const deleteComment = async (req, res)=>{
    const { commentId } = req.params;
    try{
        const result = await CommentModel.findByIdAndDelete(commentId);
        res.json(result);
    }catch(err){
        console.log('Deletion of comment is failed');
        res.json(err);
    }
}

module.exports = { returnComments, createComment, deleteComment };