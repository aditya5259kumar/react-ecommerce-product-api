import React from "react";

const Services = (prop) => {
  return (
    <div className="feature-item">
      <div className="feature-icon">{prop.icon}</div>
      <h3 className="feature-title">{prop.head}</h3>
      <p className="feature-description">{prop.text}</p>
    </div>
  );
};

export default Services;
