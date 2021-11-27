import React, { useState } from "react";
import CustomPopup from "./CustomPopup";
import { Button } from "react-bootstrap";

const CustomSearch = () => {
  const [popup, setPopup] = useState(false);

  const openPopup = () => {
    setPopup(true);
  };

  const closePopup = () => {
    setPopup(false);
  };

  return (
    <div className="custom-button">
      <Button variant="success" onClick={openPopup}>
        Custom Search
      </Button>
      {popup ? <CustomPopup closePopup={closePopup} /> : ""}
    </div>
  );
};

export default CustomSearch;
