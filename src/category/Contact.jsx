import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Contact = () => {
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
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
            <p className="h5">Contact Us</p>
            <p>
              Visit our Shop at:
              <br />
              <br />
              CALCUTTA TEA BOUTIQUE PVT LTD 
26 MAHIM HALDER STREET KOLKATA 700026
              <br />
              <br />
              <a
                href="mailto:abc@gmail.com"
                className="contact-link d-block mb-2"
              >
                <i className="bi bi-envelope"></i> Email: abc@gmail.com
              </a>
              <br />
              <a href="tel:+123456789" className="contact-link d-block mb-2">
                <i className="bi bi-telephone"></i> Phone: +123456789
              </a>
              <br />
              <a
                href="https://www.google.com/maps?q=22.522286758772452,88.3450295649241
"
                className="contact-link d-block mb-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-geo-alt"></i> 26 MAHIM HALDER STREET KOLKATA 700026
              </a>
            </p>
            <Link to={"/queries"} className='btn btn-sm btn-warning rounded-2 mt-3'>Add a Query</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
