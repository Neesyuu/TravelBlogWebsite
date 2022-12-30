import React from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./css/PerStory.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerStory } from '../store/slices/perStorySlice';
import { fetchComment } from '../store/slices/commentSlice';
import { useState } from 'react';
import ReactHTMLParser from 'html-react-parser'

import { Helmet } from "react-helmet";
import ImageList from '../components/ImageList';

function PerStoryLayout() {
    const jwt = localStorage.getItem('jwt');
    const { storyID } = useParams();   
    const host = process.env.REACT_APP_API_URL;

    const dispatch = useDispatch();
    const { isLoading, isError, data } = useSelector(state => state.perStory);
    const { isCLoading, isCError, cData } = useSelector(state => state.comment);

    const [editable, setEditable] = useState(false);
    const [show, setShow] = useState(false);

    const checkUser = async ()=>{
        try{
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
        data.map((storyData)=>{
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
        }, [3000])
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

    const dateConverter = (dateFetched)=>{
      const year = dateFetched.substr(0,4);
      const month = parseInt(dateFetched.substr(5,2));
      // const day = dateFetched.substr(8,2);
      let fullDate = ''
      if(month === 1){
        fullDate = ' January ' + year;
        return fullDate; 
      }else if(month === 2){
        fullDate = ' Feburary ' + year;
        return fullDate;
      }else if(month === 3){
        fullDate = ' March ' + year;
        return fullDate;
      }else if(month === 4){
        fullDate = ' April ' + year;
        return fullDate;
      }else if(month === 5){
        fullDate = ' May ' + year;
        return fullDate;
      }else if(month === 6){
        fullDate = ' June ' + year;
        return fullDate;
      }else if(month === 7){
        fullDate = ' July ' + year;
        return fullDate;
      }else if(month === 8){
        fullDate = ' August ' + year;
        return fullDate;
      }else if(month === 9){
        fullDate = ' September ' + year;
        return fullDate;
      }else if(month === 10){
        fullDate = ' October ' + year;
        return fullDate;
      }else if(month === 11){
        fullDate = ' November ' + year;
        return fullDate;
      }else if(month === 12){
        fullDate = ' December ' + year;
        return fullDate;
      }else{
        return dateFetched;
      }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const host = process.env.REACT_APP_API_URL;
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
    <>
      <Helmet>
        <style>{".titleName { color: white; }"}</style>
        <style>{".titleHolder .title{ color: white; }"}</style>
        <style>
          {".titleName:hover{ filter: drop-shadow(0px 5px 5px #C9F9FB); }"}
        </style>
        <style>
          {".iconPackBox:hover{ filter: drop-shadow(0px 5px 5px #C9F9FB); }"}
        </style>
      </Helmet>
      {isLoading && <h2 className="waitMessage"><i className="fas fa-spinner fa-pulse"></i></h2>}
      {!isLoading && isError && <h2 className="waitMessage">!! Error Occured !! </h2>}
      {!isLoading &&
        !isError &&
        data &&
        data.map((storyData) => {
          return (
            <>
              <div className="bg_thumbnail">
                {storyData.images.thumbnail
                  ? storyData.images.thumbnail.map((image, index) => {
                      return (
                        <img
                          key={index}
                          src={`${host}/${image.path}`}
                          alt='thumbnail'
                        />
                      );
                    })
                  : null}
              </div>
              <div className="edit_percontent">
                {editable && show && (
                  <Link to={`/editStory/${storyID}`}><img src={`${host}/public/icons/edit_icon.png`} title='Edit the content' alt='edit icon'/></Link>
                )}
              </div>
              <div className="titleDivs">
                <h4>{storyData.location}</h4>
                <h1>{storyData.title}</h1>
                <h4>{dateConverter(storyData.date)}</h4>
              </div>
            </>
          );
        })}
      <div className="per_page_content">
        <div className="per_page_des">
          {isLoading && <h1>Loading ... </h1>}
          {!isLoading && isError && <h1>!! Error Occured !! </h1>}
          {!isLoading &&
            !isError &&
            data &&
            data.map((storyData, index) => {
              return (
                <div key={index}>
                  <div className="mainContent">    
                    <h4>Story by : {storyData.editorName}</h4>
                    <div className='descriptionContent'>{ReactHTMLParser(storyData.tripDescription)}</div>
                    <h4>Location : {storyData.location}</h4>
                    <h4>Trip Budget : {storyData.budget}</h4>
                    <h4>Trip Days : {storyData.tripDays}</h4>             

                    <ImageList storyData={storyData} db={true}/>

                  </div>
                </div>
              );
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
                        <br />
                        <input
                          name="fullname"
                          value={commentBox.fullname}
                          onChange={onChange}
                        />
                      </div>
                      <div className="inputDiv">
                        <span>Email</span>
                        <br />
                        <input
                          type="email"
                          name="email"
                          value={commentBox.email}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="commentBoxR">
                      <div className="inputDiv">
                        <span>Comment</span>
                        <br />
                        <textarea
                          name="userComment"
                          value={commentBox.userComment}
                          onChange={onChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="commentBoxBTN">
                    <button style={{ textAlign: "center" }}>Submit</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="commentLists">
              {cData[0] ? <h3>Comments</h3> : null}
              {isCLoading && <h1>Loading ... </h1>}
              {!isCLoading && isCError && <h1>!! Error Occured !!</h1>}
              {!isCLoading &&
                !isCError &&
                cData &&
                cData.map((comment, index) => {
                  return (
                    <div className="eachComment" key={index}>
                      <p>{comment.userComment}</p>
                      <span>By {comment.fullname}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PerStoryLayout
