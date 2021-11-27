import "./styles.css";
import DogList from "./components/DogList";
import Header from "./components/Header";
import BreedSearch from "./components/BreedSearch";
import { useState } from "react";
function App() {
  const [randomSearch, setrandomSearch] = useState("");
  return (
    <>
      <div className="App">
        <Header />
        <input
          className="input"
          id="input"
          type="text"
          onChange={(e) => {
            setrandomSearch(e.target.value);
          }}
          placeholder="Type here to filter by breed..."
        />

        {!randomSearch && <DogList />}
        {randomSearch && <BreedSearch inputSearch={randomSearch} />}
      </div>
      <br />
    </>
  );
}

export default App;
