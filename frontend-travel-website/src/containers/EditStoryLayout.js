import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerStory } from "../store/slices/perStorySlice";
import { fetchComment } from "../store/slices/commentSlice";
import "./css/AddStory.css";
import { useEffect } from "react";
import axios from "axios";
import ImageList from "../components/ImageList";
import Card from "../components/Card";

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
  const [image, setImage] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);

  const [show, setShow] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [editThumbnail, setEditThumbnail] = useState(false);

  const countDown = () => {
    setTimeout(() => {
      setShow(true);
      console.log("I am out");
    }, [2000]);
  };

  countDown();

  useEffect(() => {
    try {
      const dataLoad = () => {
        setCredentials({
          title: data[0].title,
          location: data[0].location,
          tripDays: data[0].tripDays,
          tripDescription: data[0].tripDescription,
          budget: data[0].budget,
        });
        setImage(data[0].images.image);
        setThumbnail(data[0].images.thumbnail);
      };
      dataLoad();
    } catch (err) {
      console.log("Loading ... ");
    }
  }, [data]);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("credentials");
    console.log(credentials.title);

    const formData = new FormData();

    formData.append("title", credentials.title);
    formData.append("location", credentials.location);
    formData.append("tripDays", credentials.tripDays);
    formData.append("tripDescription", credentials.tripDescription);
    formData.append("budget", credentials.budget);

    if (editThumbnail) {
      Array.from(thumbnail).forEach((item) => {
        console.log("edit thumb");
        console.log(item);
        formData.append("thumbnail", item);
      });
    }

    if (editImage) {
      Array.from(image).forEach((item) => {
        console.log("edit image");
        console.log(item);
        formData.append("image", item);
      });
    }

    const host = "http://localhost:5000";
    axios
      .patch(`${host}/api/TravelDetails/${storyID}`, formData, {
        headers: {
          token: jwt,
        },
      })
      .then(async (res) => {
        const jsonData = await res.data;
        console.log("jsonData lol");
        console.log(jsonData);
        console.log("Trip Added Success");
        history("/myStory");
      })
      .catch((err) => {
        console.log("Failed", err);
      });
  };

  useEffect(() => {
    dispatch(fetchPerStory(storyID));
    dispatch(fetchComment(storyID));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="edit_content">
      <h2 className="sub_title">Edit Your Story</h2>
      <div className="formBg">
        <div className="closeBTN">
          <Link to="/myStory">
            <i class="fa-solid fa-circle-xmark"></i>
          </Link>
        </div>
        {isLoading && <h2>Loading ... </h2>}
        {!isLoading && isError && <h2>!! Error Occurred !!</h2>}
        {!(data[0] == null) && (
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
                    <div className="ititleName">Title : </div>
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
                    <div className="ititleName1">Location : </div>
                    <div className="textBox1">
                      <input
                        style={{ width: "90%" }}
                        name="location"
                        value={credentials.location}
                        onChange={onChange}
                      />
                    </div>
                    <div className="ititleName2">Days : </div>
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
                    <div className="ititleName1">Budget : </div>
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
                    <h3>Thumbnail Image</h3>
                    <div className="imageBox">
                    <input
                          onChange={(e) => {
                            setThumbnail(e.target.files);
                            setEditThumbnail(true);
                          }}
                          type="file"
                        />
                        {thumbnail && show && !editThumbnail && (
                          <ImageList
                            storyData={thumbnail}
                            db={false}
                            editImage={false}
                          />
                        )}
                        {thumbnail && show && editThumbnail && (
                          <ImageList
                            storyData={thumbnail}
                            db={false}
                            editImage={true}
                          />
                        )}

                        
                    </div>
                  </div>

                  <div className="subDes1p3">
                    <h3>Image</h3>
                    <div className="imageBox">
                      
                    <input
                        onChange={(e) => {
                          setImage(e.target.files);
                          setEditImage(true);
                        }}
                        multiple
                        type="file"
                      />

                      {image && show && !editImage && (
                        <ImageList
                          storyData={image}
                          db={false}
                          editImage={false}
                        />
                      )}

                      {image && show && editImage && (
                        <ImageList
                          storyData={image}
                          db={false}
                          editImage={true}
                        />
                      )}

                      
                    </div>
                  </div>

                  
                </div>
                <div className="subDes2">
                  {thumbnail && show && !editThumbnail && (
                    <Card
                      editPage={true}
                      editImage={false}
                      thumbImg={thumbnail}
                      location={credentials.location}
                      title={credentials.title}
                    />
                  )}
                  {thumbnail && show && editThumbnail && (
                    <Card
                      editPage={true}
                      editImage={true}
                      thumbImg={thumbnail}
                      location={credentials.location}
                      title={credentials.title}
                    />
                  )}
                </div>
              </div>
              <div className="submitBtn">
                <button>Submit</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditStoryLayout;
