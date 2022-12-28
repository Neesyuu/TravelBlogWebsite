import React from "react";
import "./css/IconPack.css";
import { Link } from "react-router-dom";

function IconPack(props) {
  const { image, title, link, onClick } = props;
  return (
    <div className="iconPackBox">
      <Link to={link} style={{ textDecoration: "none" }} onClick={onClick}>
      <div className="imageHolder">        
          <img src={`http://localhost:5000/${image}`} alt='Display Icon'/>
      </div>
      <div className="titleHolder">
          <span className="title">{title}</span>
      </div>
        </Link>
    </div>
  );
}

export default IconPack;
