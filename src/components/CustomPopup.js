import React, { useState, useEffect } from "react";
import "/src/styles.css";
import axios from "axios";
import { useApi } from "./util";
//import { Button } from "react-bootstrap";

// const CustomPopup = (props) => {
//   const data = useContext(DogList);
//   let { dogs } = data;
const placeHolderUrl = "https://dummyimage.com/200x200/efefef/fff";

const mapAxiosResponse = (res) => res?.data?.message;
const getBreeds = () => axios.get("https://dog.ceo/api/breeds/list/all");
const getDogImage = (breed, subBreedn) => {
  return subBreedn
    ? axios.get(
        `https://dog.ceo/api/breed/${breed}/${subBreedn}/images/random/`
      )
    : axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
};

// const CustomPopup = (props) => {
//   const [breeds, setBreedsn] = useState([]);
//   useEffect(() => {
//     const url = `"https://dog.ceo/api/${breeds}/image/random/${setBreedsn}"`;
//     fetch(url)
//       .then((resp) => resp.json())
//       .then((resp) => setBreedsn(Object.keys(resp.message)));
//   }, []);
// const getDogImage = (breed, subBreed) => {
//   return subBreed
//     ? axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${numberOfImage}`)
//     : axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
// };
const CustomPopup = (props) => {
  const {
    response: breeds,
    isFetching: isFetchingBreeds,
    error: fetchingBreedError,
    makeFetch: fetchBreeds
  } = useApi(getBreeds, mapAxiosResponse);

  const {
    response: dogImage,
    isFetching: isFetchingImage,
    error: fetchingImageError,
    makeFetch: fetchImage
  } = useApi(getDogImage, mapAxiosResponse);

  useEffect(() => {
    fetchBreeds();
  });

  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedSubBreed, setSelectedSubBreed] = useState("");
  const getImage = () => {
    fetchImage(selectedBreed, selectedSubBreed);
  };

  const onBreedSelect = (e) => {
    setSelectedBreed(e.target.value);
    setSelectedSubBreed(0);
  };
  return (
    <div>
      <div className="popup--back">
        <div className="popup--content">
          <div className="diva">
            <div className="popup--close" onClick={props.closePopup}>
              X
            </div>
            <h1>Custom Search</h1>
          </div>
          <div className="customPopup">
            {fetchingBreedError && (
              <div className="error-text"> Error fetching breed list </div>
            )}
            {isFetchingBreeds && <div> </div>}
            {breeds && (
              <>
                <div className="select-container">
                  <select
                    value={selectedBreed}
                    onChange={onBreedSelect}
                    className="optn"
                  >
                    <option value="">Select a breed</option>
                    {Object.keys(breeds).map((breed) => (
                      <option value={breed} key={breed}>
                        {breed}
                      </option>
                    ))}
                  </select>{" "}
                  <select
                    className="numb"
                    value={selectedSubBreed}
                    onChange={(e) => setSelectedSubBreed(e.target.value)}
                  >
                    <option value="">Select a sub-breed breed</option>
                    {breeds[selectedBreed]?.map((subBreedn) => (
                      <option value={subBreedn} key={subBreedn}>
                        {subBreedn}
                      </option>
                    ))}
                  </select>{" "}
                  <br />
                  <button
                    className="customPopBtn"
                    disabled={!selectedBreed || isFetchingImage}
                    onClick={getImage}
                  >
                    GET IMAGES
                  </button>
                </div>
                <div className="fetching-text">
                  {isFetchingImage && "Fetching image"}
                </div>
                {fetchingImageError && (
                  <div className="error-text"> Error fetching image</div>
                )}
                <div className="divimg">
                  <img
                    className="dog-img"
                    src={dogImage ?? placeHolderUrl}
                    alt="dog"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
