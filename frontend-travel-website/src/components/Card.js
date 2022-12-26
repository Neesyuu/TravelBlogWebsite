import React from "react";
import "./css/Card.css";
import { Link } from "react-router-dom";

function Card(props) {
  const { storyData, editPage, editImage, thumbImg, location, title } = props;

  if (editPage) {
    if (editImage) {
      return (
        <div className="card">
          <div className="card-top">
            {Array.from(thumbImg).map((item, index) => {
              return (
                <img
                  key={index}
                  src={item ? URL.createObjectURL(item) : null}
                />
              );
            })}
          </div>
          <div className="card-bottom">
            <h3 className="card_title">{location}</h3>
            <h3 className="card_des">{title}</h3>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card">
          <div className="card-top">
            {Array.from(thumbImg).map((item, index) => {
              return (
                <img key={index} src={`http://localhost:5000/${item.path}`} />
              );
            })}
          </div>
          <div className="card-bottom">
            <h3 className="card_title">{location}</h3>
            <h3 className="card_des">{title}</h3>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="card">
        <div className="card-top">
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
        <Link to={`/story/${storyData._id}`} style={{ textDecoration: "none" }}>
          <div className="card-bottom">
            <h3 className="card_title">{storyData.location}</h3>
            <h3 className="card_des">{storyData.title}</h3>
          </div>
        </Link>
      </div>
    );
  }
}

export default Card;
