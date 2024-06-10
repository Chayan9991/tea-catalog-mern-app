import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      {/* Footer Start */}
      <div className="container-fluid bg-dark footer mt-5 py-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h5 className="text-light mb-4">Our Office</h5>
              <p className="mb-2"><i className="fa fa-map-marker-alt text-secondary me-3"></i>CALCUTTA TEA BOUTIQUE PVT LTD 
              </p>
              <p className="mb-2"><i className="fa fa-map-marker-alt text-secondary me-3"></i>26 MAHIM HALDER STREET KOLKATA 700026</p>
              <p className="mb-2"><i className="fa fa-phone-alt text-secondary me-3"></i>+012 345 67890</p>
              <p className="mb-2"><i className="fa fa-envelope text-secondary me-3"></i>info@example.com</p>
              <div className="d-flex pt-3">
                <a className="btn btn-square btn-light rounded-circle me-2" href="#"><i className="fab fa-twitter"></i></a>
                <a className="btn btn-square bg-primary rounded-circle me-2" href="#"><i className="fab text-white fa-facebook-f"></i></a>
                <a className="btn btn-square btn-danger rounded-circle me-2" href="#"><i className="fab fa-youtube"></i></a>
                <a className="btn btn-square bg-primary rounded-circle me-2" href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-light mb-4">Quick Links</h5>
              <Link className="btn btn-link text-secondary" to="/about">About Us</Link>
              <Link className="btn btn-link text-secondary" to="/contact">Contact Us</Link>
              <Link className="btn btn-link text-secondary" to="/services">Our Services</Link>
              <Link className="btn btn-link text-secondary" to="/terms">Terms & Condition</Link>
              <Link className="btn btn-link text-secondary" to="/support">Support</Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-light mb-4">Business Hours</h5>
              <p className="mb-1">Monday - Friday</p>
              <h6 className="text-secondary">09:00 am - 07:00 pm</h6>
              <p className="mb-1">Saturday</p>
              <h6 className="text-secondary">09:00 am - 12:00 pm</h6>
              <p className="mb-1">Sunday</p>
              <h6 className="text-secondary">Closed</h6>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-light mb-4">Newsletter</h5>
              <p>Stay updated with our latest news and offers.</p>
              <div className="position-relative w-100">
                <input className="form-control bg-transparent text-white w-100 py-3 ps-2 pe-5" type="text" placeholder="Your email" />
                <button type="button" style={{backgroundColor:"#6AB187", color:"white"}} className="btn btn-sm py-2 position-absolute top-0 end-0 mt-2 me-2">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}

      {/* Copyright Start */}
      <div className="container-fluid copyright py-4 bg-dark text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; <a className="fw-medium text-light" href="#">Your Site Name</a>, All Right Reserved.
            </div>
            <div className="col-md-6 text-center text-md-end">
              Made with ❤️ by Phoe9ix
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
