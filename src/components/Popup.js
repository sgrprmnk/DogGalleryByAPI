import React from "react";
import "./popup.css";
import { useEffect, useState } from "react";
import Dog from "./Dog";

const Popup = ({ closePopup, breedName }) => {
  const [subbreedlist, setsubbreedlist] = useState([]);
  const [flag, setflag] = useState([]);
  const [moreimg, setmoreimg] = useState([]);
  useEffect(() => {
    fetch(`https://dog.ceo/api/breed/${breedName}/list`)
      .then((res) => res.json())
      .then((d) => {
        //console.log(d.message);
        setflag(d.message);
        //console.log(subbreedlist);
      });
    fetch(`https://dog.ceo/api/breed/${breedName}/images/random/15`)
      .then((res) => res.json())
      .then((d) => {
        //console.log(d.message);
        setmoreimg(d.message);
      });
  });
  useEffect(() => {
    flag &&
      flag.map((subbreed) => {
        //console.log("flag=",flag)
        fetch(
          `https://dog.ceo/api/breed/${breedName}/${subbreed}/images/random`
        )
          .then((res) => res.json())
          .then((image) => {
            const subbreedobj = { img: image.message, name: subbreed };
            setsubbreedlist([...subbreedlist, subbreedobj]);
            //console.log(subbreedobj);
          });
      });
  });

  return (
    <div className="popup--back">
      <div className="popup--content">
        <div className="popup--close" onClick={closePopup}>
          x
        </div>
        {flag && (
          <h3 id="popupheading">
            {"Breed: " + breedName + "  |  Total Sub-breed: " + flag.length}
          </h3>
        )}
        <h5 style={{ marginBottom: "0" }}>Sub-Breed</h5>
        <div className="subbreed-div">
          {flag &&
            flag.map((name, i) => {
              return (
                <div key={i}>
                  <Dog
                    breedImg={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIP_Pub1_Rpm3oWXY99Ha_D8xujczrt5n3Ww&usqp=CAU"
                    }
                    breedName={name}
                  />
                </div>
              );
            })}
        </div>
        <h5 style={{ marginBottom: "0" }}>More Images</h5>
        <div className="subbreed-div">
          {flag &&
            moreimg &&
            moreimg.map((img, i) => {
              return (
                <div key={i}>
                  <Dog breedImg={img} breedName={""} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default Popup;
