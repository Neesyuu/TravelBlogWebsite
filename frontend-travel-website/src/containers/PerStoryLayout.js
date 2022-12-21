import React from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./css/PerStory.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerStory } from '../store/slices/perStorySlice';
import { fetchComment } from '../store/slices/commentSlice';
import { useState } from 'react';

function PerStoryLayout() {
    const jwt = localStorage.getItem('jwt');
    const { storyID } = useParams();   

    const dispatch = useDispatch();
    const { isLoading, isError, data } = useSelector(state => state.perStory);
    const { isCLoading, isCError, cData } = useSelector(state => state.comment);

    const [editable, setEditable] = useState(false);
    const [show, setShow] = useState(false);

    const checkUser = async ()=>{
        try{
          const host = "http://localhost:5000";
          const res = await fetch(`${host}/api/getUser`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "token": localStorage.getItem('jwt'),
            },
          });
          const jsonData = await res.json();
          return jsonData._id;

        }catch(error){
          console.log(error);
        }      
      }

    const storyEditor = async ()=>{
        const userKoId = await checkUser();
        data.map((storyData, index)=>{
            if(storyData.userId === userKoId){
                setEditable(true);
            }else{
                setEditable(false);
            }
            return(<></>)
        })
        
    }

    if(jwt){
        storyEditor();
    }

    const countDown = ()=>{
        setTimeout(()=>{
            setShow(true);
            console.log('I am out')
        }, [2000])
    }    

    useEffect(()=>{
        dispatch(fetchPerStory(storyID));
        dispatch(fetchComment(storyID));
        countDown();
        // eslint-disable-next-line
    },[])    
    
    
    const [commentBox, setCommentBox] = useState({
        'fullname': '',
        'email': '',
        'userComment': ''
    });

    const onChange = (e)=>{
        setCommentBox({ ...commentBox , [e.target.name]: [e.target.value]});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const host = "http://localhost:5000";
        const res = await fetch(`${host}/api/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            travelId: storyID,
            fullname: commentBox.fullname[0],
            email: commentBox.email[0],
            userComment: commentBox.userComment[0],
            display: true,
        }),
        });
        const jsonData = await res.json();

        if (jsonData) {
            console.log("Comment Success");
            dispatch(fetchComment(storyID));
            setCommentBox({
                'fullname': '',
                'email': '',
                'userComment': ''
            })
        }
    }

    


  return (
    <div className="content">
        {/* {editable && <h2>Editable True</h2>} */}
        {editable && show && <Link to={`/editStory/${storyID}`}>Edit Story</Link>}
        {isLoading && <h1>Loading ... </h1>}
        {!isLoading &&  isError && <h1>!! Error Occured !! </h1>}
        {!isLoading &&  !isError && data && 
        data.map((storyData, index)=>{
            return(            
            <div key={index}>
                <div className="titleDiv">
                    <h4>Location</h4>
                    <h1>{storyData.title}</h1>
                    <h4>January 06, 1998</h4>
                </div>
                <div className="mainContent">
                    <h4>Trip Days : {storyData.tripDays}</h4>
                    <p>{storyData.tripDescription}</p>
                    <div className="mainConImage">
                        <ul>
                            <li>Image 1</li>
                            <li>Image 2</li>
                            <li>Image 3</li>
                        </ul>
                    </div>
                </div>
            </div>
            )
        })}
        <div className="commentDiv">
            <div className="commentBox">
                <h3>Leave a Comment</h3>
                <form onSubmit={handleSubmit}>
                    <div className="commentBoxBG">
                        <div className="commentBoxContent">
                            <div className="commentBoxL">
                                <div className="inputDiv">
                                    <span>Full Name</span>
                                    <br/>
                                    <input name='fullname' value={commentBox.fullname} onChange={onChange}/>
                                </div>
                                <div className="inputDiv">
                                    <span>Email</span>
                                    <br/>
                                    <input type='email' name='email' value={commentBox.email} onChange={onChange}/>
                                </div>
                            </div>
                            <div className="commentBoxR">
                                <div className="inputDiv">
                                    <span>Comment</span>
                                    <br/>
                                    <textarea name='userComment' value={commentBox.userComment} onChange={onChange}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="commentBoxBTN">
                            <button style={{textAlign: "center"}}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="commentLists">
                <h3>Comments</h3>
                {isCLoading && <h1>Loading ... </h1>}
                {!isCLoading && isCError && <h1>!! Error Occured !!</h1>}
                {!isCLoading && !isCError && cData &&
                cData.map((comment, index)=>{
                    return(
                        <div className="eachComment" key={index}>
                            <p>{comment.userComment}</p>
                            <span>By {comment.fullname}</span>
                        </div>
                    )
                })
            }            
            </div>
            
        </div>
    </div>
  )
}

export default PerStoryLayout
