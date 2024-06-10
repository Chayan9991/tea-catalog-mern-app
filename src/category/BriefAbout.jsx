import { Link } from "react-router-dom";

const BriefAbout = () => {
  return (
    <>
      <div className="container-fluid" style={{ marginTop: "6em" }}>
        <div className="brief-about container-fluid">
          <div className="brief-about container-fluid shadow-sm">
            <img
              src="images/tea-store-about.jpg"
              className="img-fluid w-100 h-100"
              alt=""
            />
          </div>
          <div className="brief-about-section">
            <p className="header">About Us</p>
            <p className="body">
              Founded in 2014, Calcutta Tea Boutique pvt ltd. is a loose leaf tea merchants
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
