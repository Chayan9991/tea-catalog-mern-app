import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="container-fluid bg-white sticky-top ">
            <div className="container">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-1 py-lg-0">
                    <Link to="/" className="navbar-brand">
                        <img className="img-fluid logo" src="images/tea-logo.png" alt="Logo" />
                        <span className='text-muted small text-uppercase' style={{fontSize: ".75em"}}>Tea Store</span>
                    </Link>
                    <button
                        type="button"
                        className={`navbar-toggler ${isMenuOpen ? 'collapsed' : ''}`}
                        onClick={toggleMenu}
                        aria-controls="navbarCollapse"
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation"
                    >
                         <span className="toggler-icon top-bar"></span>
                        <span className="toggler-icon middle-bar"></span>
                        <span className="toggler-icon bottom-bar"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarCollapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                                <hr className="my-0 hr-line" />
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">About</Link>
                                <hr className="my-0 hr-line" />
                            </li>
                            <li className="nav-item">
                                <Link to="/products" className="nav-link">Products </Link>
                                
                                <hr className="my-0 hr-line" />
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">Contact</Link>
                            
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
