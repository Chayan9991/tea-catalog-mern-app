import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 col-md-9">
                    <div className="brief-about container-fluid shadow-sm">
                        <img src="images/tea-image-6.jpg" className="img-fluid w-100 h-100" alt="" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="brief-contact-section">
                        <p className="h5">Contact Us</p>
                        <p>
                            Visit our cafe, bar and evening restaurant at:<br /><br />
                            84 Heaton Road, Newcastle-Upon-Tyne, NE6 5HL, United Kingdom.<br /><br />
                            <a href="mailto:abc@gmail.com" className="contact-link d-block mb-2"><i className="fas fa-envelope"></i> Email: abc@gmail.com</a><br />
                            <a href="tel:+123456789" className="contact-link d-block mb-2"><i className="fas fa-phone"></i> Phone: +123456789</a><br />
                            <a href="https://maps.google.com" className="contact-link d-block" target="_blank"><i className="fas fa-map-marker-alt"></i> Location: 123, Street Name, City, Country</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
