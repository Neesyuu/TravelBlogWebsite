import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerStory } from '../store/slices/perStorySlice';
import { fetchComment } from '../store/slices/commentSlice';
import "./css/AddStory.css";
import { useEffect } from "react";

function EditStoryLayout() {
  const history = useNavigate();
  const { storyID } = useParams(); 
  const jwt = localStorage.getItem("jwt");

  const dispatch = useDispatch();
  const { isLoading, isError, data } = useSelector((state) => state.perStory);
  const { isCLoading, isCError, cData } = useSelector((state) => state.comment);
  const [credentials, setCredentials] = useState({
    title: "hello",
    location: "",
    tripDays: "",
    tripDescription: "",
    budget: "",
  });

  useEffect(() => {    
    try{  
      const dataLoad =  ()=>{
        setCredentials({
          title: data[0].title,
          location: data[0].location,
          tripDays: data[0].tripDays,
          tripDescription: data[0].tripDescription,
          budget: data[0].budget,
        })
      }  
      dataLoad();
    }catch(err){
      console.log('Loading ... ');
    }
    
  }, [data])
  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const host = "http://localhost:5000";
    const res = await fetch(`${host}/api/TravelDetails/${storyID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "token": jwt,
      },
      body: JSON.stringify({
        title: credentials.title,
        location: credentials.location,
        tripDays: credentials.tripDays,
        tripDescription: credentials.tripDescription,
        budget: credentials.budget,
      }),
    });

    const jsonData = await res.json();

    if (jsonData) {
      console.log("Trip Added Success");
      history("/myStory");
    } else {
      console.log("Failed");
    }
  };

  useEffect(() => {
    dispatch(fetchPerStory(storyID));
    dispatch(fetchComment(storyID));
    // eslint-disable-next-line
  }, []);  

  return (
    <div className="content">
      <h2 className="sub_title">Edit Your Story</h2>
      <div className="formBg">
        <div className="closeBTN">
          <Link to="/myStory">Close</Link>
        </div>
        {isLoading && <h2>Loading ... </h2>}
        {!isLoading && isError && <h2>!! Error Occurred !!</h2>}
        {!(data[0] == null) && 
        <form onSubmit={handleSubmit}>
          <div className="form">
            <span>Description</span>
            <br />
            <textarea
              name="tripDescription"
              value={credentials.tripDescription}
              onChange={onChange}
            ></textarea>
            <div className="subDescription">
              <div className="subDes1">
                <div className="subDes1p1">
                  <div className="titleName">Title : </div>
                  <div className="textBox">
                    <input
                      style={{ width: "90%" }}
                      name="title"
                      value={credentials.title}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="subDes1p2">
                  <div className="titleName1">Location : </div>
                  <div className="textBox1">
                    <input
                      style={{ width: "90%" }}
                      name="location"
                      value={credentials.location}
                      onChange={onChange}
                    />
                  </div>
                  <div className="titleName2">Days : </div>
                  <div className="textBox2">
                    <input
                      type="number"
                      style={{ width: "78%" }}
                      name="tripDays"
                      value={credentials.tripDays}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="subDes1p2">
                  <div className="titleName1">Budget : </div>
                  <div className="textBox1">
                    <input
                      type="number"
                      style={{ width: "90%" }}
                      name="budget"
                      value={credentials.budget}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="subDes1p3">
                  <h3>Image</h3>
                  <div className="imageBox">
                    <ul>
                      <li>Image 1</li>
                      <li>
                        <button>Upload Image</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="subDes2">
                <h2>Image Here</h2>
              </div>
            </div>
            <div className="submitBtn">
              <button>Submit</button>
            </div>
          </div>
        </form>
        }
      </div>
    </div>
  );
}

export default EditStoryLayout;
