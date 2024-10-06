import React from "react";
import './NoDataFound.css'; 

const NoDataFound = ({ message }) => {
    return (
      <div className="no-data-container">
        <p className="no-data-message">{message}</p>
      </div>
    );
  };
  
  export default NoDataFound;