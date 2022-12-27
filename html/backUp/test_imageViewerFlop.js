import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../containers/css/PerStory.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerStory } from "../store/slices/perStorySlice";
import { fetchComment } from "../store/slices/commentSlice";
import { useState } from "react";

import { Helmet } from "react-helmet";
import Slider from "react-slick";

function LoginLayout() {
  const jwt = localStorage.getItem("jwt");
  const storyID = "63a46d79272ad8e550427263";

  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector((state) => state.perStory);
  const { isCLoading, isCError, cData } = useSelector((state) => state.comment);

  const [editable, setEditable] = useState(false);
  const [show, setShow] = useState(false);


  const checkUser = async () => {
    try {
      const host = "http://localhost:5000";
      const res = await fetch(`${host}/api/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("jwt"),
        },
      });
      const jsonData = await res.json();
      return jsonData._id;
    } catch (error) {
      console.log(error);
    }
  };

  const storyEditor = async () => {
    const userKoId = await checkUser();
    data.map((storyData, index) => {
      if (storyData.userId === userKoId) {
        setEditable(true);
      } else {
        setEditable(false);
      }
      return <></>;
    });
  };

  if (jwt) {
    storyEditor();
  }

  const countDown = () => {
    setTimeout(() => {
      setShow(true);
      console.log("I am out");
    }, [2000]);
  };

  useEffect(() => {
    dispatch(fetchPerStory(storyID));
    dispatch(fetchComment(storyID));
    countDown();
    // eslint-disable-next-line
  }, []);

  const [commentBox, setCommentBox] = useState({
    fullname: "",
    email: "",
    userComment: "",
  });

  const onChange = (e) => {
    setCommentBox({ ...commentBox, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
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
        fullname: "",
        email: "",
        userComment: "",
      });
    }
  }; 

  const settings = { 
    customPaging: function(i) {
      return (
        <a>
          <img src={`http://localhost:5000/${data[0].images.image[i].path}`} />
        </a>
      );
    },  
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


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
      {isLoading && <h1>Loading ... </h1>}
      {!isLoading && isError && <h1>!! Error Occured !! </h1>}
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
                          src={`http://localhost:5000/${image.path}`}
                        />
                      );
                    })
                  : null}
              </div>

              <div className="titleDivs">
                {editable && show && (
                  <Link to={`/editStory/${storyID}`}><img src={`http://localhost:5000/public/edit_icon.png`} title='Edit the content'/></Link>
                )}
                <h4>Location</h4>
                <h1>{storyData.title}</h1>
                <h4>January 06, 1998</h4>
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
                    <p>{storyData.tripDescription}</p>
                    <h4>Trip Days : {storyData.tripDays}</h4>

                    <div className="mainConImage">
                      <Slider {...settings}>
                      {storyData.images.image
                        ? storyData.images.image.map((image, index) => {
                            return (
                              <img
                                key={index}
                                src={`http://localhost:5000/${image.path}`}
                              />
                            );
                          })
                        : null}                     
                      </Slider>
                    </div>
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
  );
}

export default LoginLayout;