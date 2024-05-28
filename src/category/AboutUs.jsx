import {useEffect} from "react";


const AboutUs = () => {
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  })
  
  return (
    <div className="container-fluid px-1">
      <div className="col-md-6 offset-md-3">
        <p className="heading text-center" style={{ fontSize: "1.5em" }}>
          About Us
        </p>
        <div className="about-description">
          <p className="about-body text-center mt-5">
            ESTATE TEA CO IS AN INDEPENDENT TEA MERCHANTS, SPECIALISING IN
            SINGLE ESTATE, SMALL BATCH AND FINE QUALITY LOOSE LEAF TEAS. WE WERE
            FOUNDED OUT OF A LOVE FOR DISCOVERING RARE AND EXCITING TEAS.
          </p>
          <p
            className="text-center text-muted mb-4"
            style={{ fontSize: ".85em" }}
          >
            Our collection of teas will change throughout the year as certain
            teas come in and out of season. This gives us exciting opportunities
            to showcase new micro-lots and smaller batches that would otherwise
            not make their way into the UK.
          </p>
        </div>
        <div className="img-container">
          <img
            src="images/video-bg.jpg"
            alt="about-image"
            className="about-us-images"
            style={{ height: "300px", width: "100%", justifyContent: "center" }}
          />
        </div>
        <div className="about-description">
          <p className="about-body text-center mt-5">
            OUR APPROACH TO TEA SOURCING IS THROUGH EITHER DIRECT TRADE OR
            DIRECT TRACEABILITY - AND ALWAYS THROUGH ETHICAL CHANNELS.
          </p>
          <p
            className="text-center text-muted mb-4"
            style={{ fontSize: ".85em" }}
          >
            Where we can, we will buy our teas direct from the garden. However
            due to the extensive range of teas we offer, it is impossible to
            source 100% of our teas direct from gardens. So when we can't offer
            direct trade, we offer direct traceability through ethical channels.
            Read more about our sourcing here.
          </p>
        </div>
        <div className="img-container">
          <img
            src="images/video-bg.jpg"
            alt="about-image"
            className="about-us-images"
            style={{ height: "300px", width: "100%", justifyContent: "center" }}
          />
        </div>
        <div className="about-description">
          <p
            className="text-center text-muted mb-4 mt-4"
            style={{ fontSize: ".85em" }}
          >
            Our teas are purchased from key tea growing regions around the
            world, including India, Japan, China, Sri Lana and Taiwan. Each
            region has their own unique culture when it comes to growing and
            processing their tea - and it is our responsibility to connect these
            people with the end drinkers.
          </p>
        </div>
        <div className="img-container">
          <img
            src="images/video-bg.jpg"
            alt="about-image"
            className="about-us-images"
            style={{ height: "300px", width: "100%", justifyContent: "center" }}
          />
        </div>
        <div className="about-description">
          <p
            className="text-center text-muted mb-4 mt-4"
            style={{ fontSize: ".85em" }}
          >
            Our teas are purchased from key tea growing regions around the
            world, including India, Japan, China, Sri Lana and Taiwan. Each
            region has their own unique culture when it comes to growing and
            processing their tea - and it is our responsibility to connect these
            people with the end drinkers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
