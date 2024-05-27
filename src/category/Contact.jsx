import React from 'react'
import {Link} from 'react-router-dom'

const Contact = () => {
    return (
        <div className="container mt-5">
        <div className="row">
          <div className="col-md-9">
            <div className="brief-about container-fluid">
              <img src="images/tea-image-6.jpg" className="img-fluid" alt="" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="brief-contact-section">
              <p className="header">Contact Us</p>
              <p className="body">
                Visit our cafe, bar and evening restaurant at:<br /><br />
                84 Heaton Road, Newcastle-Upon-Tyne, NE6 5HL, United Kingdom.<br /><br />
                <a href="mailto:abc@gmail.com" className="contact-link"><i className="fas fa-envelope"></i> Email: abc@gmail.com</a><br /><br />
                <a href="tel:+123456789" className="contact-link"><i className="fas fa-phone"></i> Phone: +123456789</a><br /><br />
                <a href="https://maps.google.com" className="contact-link" target="_blank"><i className="fas fa-map-marker-alt"></i> Location: 123, Street Name, City, Country</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
    );
  
}

export default Contact