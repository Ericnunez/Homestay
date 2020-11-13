import React from "react";
import "./contentcard.css";

const ContentCard = ({ src, title, description, price }) => {
  return (
    <div className="contentcard">
      <img src={src} alt="" />
      <div className="contentcard-info">
        <h2>{title}</h2>
        <h4>{description}</h4>
        <h3>{price}</h3>
      </div>
    </div>
  );
};

export default ContentCard;
