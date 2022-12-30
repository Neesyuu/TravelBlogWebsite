import React from "react";
import "./css/Card.css";
import { Link } from "react-router-dom";

function AddCard(props) {
  const { url, editCard, imageURL } = props;
  const host = process.env.REACT_APP_API_URL;
  if(editCard){
    return (
      <div className="card">
        <Link to={url} style={{ textDecoration: "none" }}>
          <div className="card-top">
            <img
              src={`${host}/public/${imageURL}`}
              alt='thumbnail'
            />
          </div>
        </Link>
        <div className="card-bottom">
          <h3 className="card_title">
            <Link to={url} style={{ textDecoration: "none" }}>
              About ME
            </Link>
          </h3>
          <h3 className="card_des">
          ......................................................................
          </h3>
        </div>
      </div>
    );

  }else{
  return (
    <div className="card">
      <Link to={url} style={{ textDecoration: "none" }}>
        <div className="card-top">
          <img
            className="addImg"
            src={`${host}/public/icons/addNew.png`}
            alt='thumbnail'
          />
        </div>
      </Link>
      <div className="card-bottom">
        <h3 className="card_title">
          <Link to={url} style={{ textDecoration: "none" }}>
            Add Your Log
          </Link>
        </h3>
        <h3 className="card_des">
          Travelling is fun but writing about it, is best.
        </h3>
      </div>
    </div>
  );
  }
}

export default AddCard;
