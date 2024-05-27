import { Link } from "react-router-dom";

const BriefAbout = () => {
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="brief-about container-fluid">
          <img src="images/tea-store-about.jpg" className="" alt="" />
          <div className="brief-about-section">
            <p className="header">About Us</p>
            <p className="body">
              Founded in 2014, Estate Tea Co is a loose leaf tea merchants
              specialising in single estate, small batch and hand blended teas.
              <br />
              <br />
              We supply our teas to cafes, restaurants and hotels across the UK,
              as well as operating our own cafe and eatery based in
              Newcastle-Upon-Tyne
            </p>
            <Link to="/about" className="about-link">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BriefAbout;
