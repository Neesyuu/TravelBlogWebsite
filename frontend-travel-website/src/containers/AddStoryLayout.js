import React from "react";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/AddStory.css";
import axios from "axios";
import ImageList from "../components/ImageList";
import Card from "../components/Card";
import { placeMessage, placeMessageType } from "../store/slices/alertSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import JoditEditor from 'jodit-react';

function AddStoryLayout() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const host = process.env.REACT_APP_API_URL;

  // rich text editor
  const editor = useRef(null);
  // editor

  const [credentials, setCredentials] = useState({
    title: "",
    location: "",
    tripDays: "",
    tripDescription: "",
    budget: "",
    date: "",
  });
  const [image, setImage] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", credentials.title[0]);
    formData.append("location", credentials.location[0]);
    formData.append("tripDays", credentials.tripDays[0]);
    formData.append("tripDescription", credentials.tripDescription);
    formData.append("budget", credentials.budget[0]);
    formData.append("date", credentials.date[0]);

    Array.from(thumbnail).forEach((item) => {
      formData.append("thumbnail", item);
    });

    Array.from(image).forEach((item) => {
      formData.append("image", item);
    });
    
    axios
      .post(`${host}/api/TravelDetails`, formData, {
        headers: {
          token: jwt,
        },
      })
      .then(async (res) => {
        // const jsonData = await res.data;
        dispatch(placeMessage("Story is added successfully"));
        dispatch(placeMessageType("success"));
        history("/myStory");
      })
      .catch((err) => {
        console.log("Failed", err);
        dispatch(placeMessage("Failed to add story"));
        dispatch(placeMessageType("error"));
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      history("/login");
    }
    // eslint-disable-next-line
  }, []);
  
  return (
    <div className="edit_content">
      <h2 className="sub_title">Add Your Story</h2>
      <div className="formBg">
        <div className="closeBTN">
          <Link to="/myStory">
          <i className="fa-solid fa-circle-left"></i>
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <span>Description</span>
            <br />
            <div className="form_texteditor">
            {/* <textarea id="editor" name="tripDescription" onChange={onChange}></textarea> */}
            <JoditEditor
                    ref={editor}
                    value={credentials.tripDescription}
                    onChange={(newContent) => {
                      setCredentials({
                        ...credentials,
                        tripDescription: newContent,
                      });
                    }}
                  />
            </div>
            <br />            

            <div className="subDescription">
              <div className="subDes1">
                <div className="subDes1p1">
                  <div className="ititleName">Title : </div>
                  <div className="textBox">
                    <input
                      style={{ width: "90%" }}
                      name="title"
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="subDes1p2">
                  <div className="ititleName1">Location : </div>
                  <div className="textBox1">
                    <input
                      style={{ width: "90%" }}
                      name="location"
                      onChange={onChange}
                    />
                  </div>
                  <div className="ititleName2">Days : </div>
                  <div className="textBox2">
                    <input
                      type="string"
                      style={{ width: "78%" }}
                      name="tripDays"
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="subDes1p2">
                  <div className="ititleName1">Budget : </div>
                  <div className="textBox1">
                    <input
                      type="string"
                      style={{ width: "90%" }}
                      name="budget"
                      onChange={onChange}
                    />
                  </div>
                  <div className="ititleName2">Date : </div>
                  <div className="textBox2">
                    <input
                      type="date"
                      style={{ width: "78%" }}
                      name="date"
                      onChange={onChange}
                      placeholder='YYYY-MM-DD'
                      maxLength={10}
                    />
                  </div>
                </div>

                <div className="subDes1p3">
                  <h3>Thumbnail Image</h3>
                  <div className="imageBox">
                    <input
                      onChange={(e) => {
                        setThumbnail(e.target.files);
                      }}
                      type="file"
                    />
                    <ImageList
                      storyData={thumbnail}
                      db={false}
                      editImage={true}
                    />
                  </div>
                </div>

                <div className="subDes1p3">
                  <h3>Image</h3>
                  <div className="imageBox">
                    <input
                      onChange={(e) => {
                        setImage(e.target.files);
                      }}
                      multiple
                      type="file"
                    />
                    <ImageList storyData={image} db={false} editImage={true} />
                  </div>
                </div>
              </div>
              <div className="subDes2">
                <Card
                  editPage={true}
                  editImage={true}
                  thumbImg={thumbnail}
                  location={credentials.location}
                  title={credentials.title}
                />
              </div>
            </div>
            <div className="submitBtn">
              <button>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStoryLayout;
