import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/AddStory.css";

function AddStoryLayout() {
  const history = useNavigate();
  const jwt = localStorage.getItem("jwt");

  const [credentials, setCredentials] = useState({
    title: "",
    location: "",
    tripDays: "",
    tripDescription: "",
    budget: "",
  });
  const [image, setImage] = useState([]);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const host = "http://localhost:5000";
    const res = await fetch(`${host}/api/TravelDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: jwt,
      },
      body: JSON.stringify({
        title: credentials.title[0],
        location: credentials.location[0],
        tripDays: credentials.tripDays[0],
        tripDescription: credentials.tripDescription[0],
        budget: credentials.budget[0],
      }),
    });

    const jsonData = await res.json();
    console.log("jsonData lol");
    console.log(jsonData);

    if (jsonData) {
      console.log("Trip Added Success");
      history("/myStory");
    } else {
      console.log("Failed");
    }
  };


  return (
    <div className="content">
      <h2 className="sub_title">Add Your Story</h2>
      <div className="formBg">
        <div className="closeBTN">
          <Link to="/myStory">Close</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <span>Description</span>
            <br />
            <textarea name="tripDescription" onChange={onChange}></textarea>
            <div className="subDescription">
              <div className="subDes1">
                <div className="subDes1p1">
                  <div className="titleName">Title : </div>
                  <div className="textBox">
                    <input
                      style={{ width: "90%" }}
                      name="title"
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
                      onChange={onChange}
                    />
                  </div>
                  <div className="titleName2">Days : </div>
                  <div className="textBox2">
                    <input
                      type="number"
                      style={{ width: "78%" }}
                      name="tripDays"
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
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="subDes1p3">
                  <h3>Image</h3>
                  <div className="imageBox">
                    <ul>
                      {Array.from(image).map((item) => {
                        return (
                          <li>
                            <img
                              style={{
                                width: "150px",
                                height: "150px",
                                padding: "10px",
                              }}
                              src={item ? URL.createObjectURL(item) : null}
                            />
                          </li>
                        );
                      })}
                      <input
                        onChange={(e) => {
                          setImage(e.target.files);
                        }}
                        multiple
                        type="file"
                      />
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
      </div>
    </div>
  );
}

export default AddStoryLayout;
