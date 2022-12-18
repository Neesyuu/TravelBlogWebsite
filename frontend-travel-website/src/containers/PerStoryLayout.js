import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./css/PerStory.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerStory } from '../store/slices/perStorySlice';

function PerStoryLayout() {
    const { storyID } = useParams();
    

    const dispatch = useDispatch();
    const { isLoading, isError, data } = useSelector(state => state.perStory);

    useEffect(()=>{
        dispatch(fetchPerStory(storyID));
    },[])


  return (
    <div className="content">
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
                <div className="commentBoxBG">
                    <div className="commentBoxContent">
                        <div className="commentBoxL">
                            <div className="inputDiv">
                                <span>Full Name</span>
                                <br/>
                                <input/>
                            </div>
                            <div className="inputDiv">
                                <span>Email</span>
                                <br/>
                                <input/>
                            </div>
                        </div>
                        <div className="commentBoxR">
                            <div className="inputDiv">
                                <span>Comment</span>
                                <br/>
                                <textarea></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="commentBoxBTN">
                        <button style={{textAlign: "center"}}>Submit</button>
                    </div>
                </div>
            </div>
            <div className="commentLists">
                <h3>Comments</h3>
                <div className="eachComment">
                    <p>hello world</p>
                    <span>By Writer</span>
                </div>

                <div className="eachComment">
                    <p>hello world</p>
                    <span>By Writer</span>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default PerStoryLayout
