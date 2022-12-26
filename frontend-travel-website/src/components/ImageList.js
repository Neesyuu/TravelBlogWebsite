import React from "react";
import "./css/ImageList.css";

function ImageList(props) {
  const { storyData, db, editImage } = props;

  if (db) {
    return (
      <div className="mainConImage">
        {storyData.images.image
          ? storyData.images.image.map((image, index) => {
              return (
                <div className="imgList">
                  <img
                    key={index}
                    src={`http://localhost:5000/${image.path}`}
                  />
                </div>
              );
            })
          : null}
      </div>
    );
  } else {
    if (editImage) {
      return (
        <div className="mainConImage">
          {Array.from(storyData).map((item, index) => {
            return (
              <div className="imgList">
                <img
                  key={index}
                  src={item ? URL.createObjectURL(item) : null}
                />
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="mainConImage">
          {Array.from(storyData).map((item, index) => {
            return (
              <div className="imgList">
                <img key={index} src={`http://localhost:5000/${item.path}`} />
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default ImageList;
