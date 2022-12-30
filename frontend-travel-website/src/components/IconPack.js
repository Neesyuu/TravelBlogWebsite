import React from "react";
import "./css/IconPack.css";
import { Link } from "react-router-dom";

function IconPack(props) {
  const { image, title, link, onClick } = props;
  const host = process.env.REACT_APP_API_URL;
  return (
    <div className="iconPackBox">
      <Link to={link} style={{ textDecoration: "none" }} onClick={onClick}>
      <div className="imageHolder">        
          <img src={`${host}/${image}`} alt='Display Icon'/>
      </div>
      <div className="titleHolder">
          <span className="title">{title}</span>
      </div>
        </Link>
    </div>
  );
}

export default IconPack;
