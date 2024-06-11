import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-9">
          <div className="brief-about container-fluid shadow-sm">
            <img
              src="images/tea-image-6.jpg"
              className="img-fluid w-100 h-100"
              alt="Tea Image"
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="brief-contact-section">
            <p
              className="text-center text-uppercase text-secondary fw-semibold"
              style={{ fontSize: "1em" }}
            >
              Contact Us
            </p>
            <p className="mt-3 text-center bg-success px-2 py-1">
              <p className="text-white fw-bold" style={{ fontSize: "1em" }}>
                CALCUTTA TEA BOUTIQUE PVT LTD
              </p>
              <p className="text-white fw-bold" style={{ fontSize: ".85em" }}>
                26 Mahim Halder Street Kolkata 700026
              </p>
            </p>

            <p className="d-flex justify-content-center mt-3 ">
              <a href="tel:+123456789" className="contact-link d-block mb-2">
                <i className="bi bi-telephone"></i> Phone: +123456789
              </a>
            </p>
            <p className="d-flex justify-content-center mt-1 ">
              <a
                href="mailto:abc@gmail.com"
                className="contact-link d-block mb-2"
              >
                <i className="bi bi-envelope"></i> Email: abc@gmail.com
              </a>
            </p>

            <div className="map-container mt-3">
              <iframe
                src="https://www.google.com/maps?q=22.522293883796692,88.34508751027325&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
            <Link
              to={"/queries"}
              className="btn btn-sm btn-warning rounded-2 mt-3"
            >
              Add a Query
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
