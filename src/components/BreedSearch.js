import { useState, useEffect } from "react";
import Dog from "./Dog";
import "../styles.css";
const BreedSearch = ({ randomSearch }) => {
  const [list, setlist] = useState([]);
  useEffect(() => {
    fetch(`https://dog.ceo/api/breed/${randomSearch}/images`)
      .then((req) => req.json())
      .then((d) => {
        if (d.status === "success") {
          setlist([...list, ...d.message]);
          console.log(list, d);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="randombreedlist">
      {list.length === 0 && (
        <div>
          <h2>OOPS!</h2>
          <h3>Try Again...</h3>
        </div>
      )}
      {list.length > 0 &&
        list.map((breed, i) => {
          return (
            <div className={"breed-list-div"} key={i}>
              {/* <img src={breed} alt="breedImage"/> */}
              <Dog breedImg={breed} breedName={breed.split("/")[4]} />
            </div>
          );
        })}
    </div>
  );
};

export default BreedSearch;
