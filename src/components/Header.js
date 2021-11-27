import "../styles.css";
import CustomSearch from "./CustomSearch";
const Header = ({ serchBreed }) => {
  return (
    <>
      <div className="header">
        <section>
          <CustomSearch />
          <h1 id="text">Dog Gallery</h1>
        </section>
      </div>
      <br />
    </>
  );
};

export default Header;
