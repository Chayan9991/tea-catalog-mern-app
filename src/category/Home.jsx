import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import Contact from "./Contact";

export const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const carouselRef = useRef(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (carouselRef.current) {
                const carousel = carouselRef.current;
                const activeIndex = Number(carousel.querySelector('.active').getAttribute('data-bs-slide-to'));
                const nextIndex = (activeIndex + 1) % carousel.querySelectorAll('.carousel-item').length;
                carousel.querySelector(`[data-bs-slide-to="${nextIndex}"]`).click();
            }
        }, 2000); // Change slide every 2 seconds

        return () => clearInterval(intervalId);
    }, []);


    const [showProducts, setShowProducts] = useState(4); // Initial number of products to show
    const products = [
        { id: 1, name: "Green Tea", image: "images/product-1.jpg", description: "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum" },
        { id: 2, name: "Black Tea", image: "images/product-2.jpg", description: "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum" },
        { id: 3, name: "Spiced Tea", image: "images/product-3.jpg", description: "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum" },
        { id: 4, name: "Organic Tea", image: "images/product-4.jpg", description: "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum" },
        { id: 5, name: "Herbal Tea", image: "images/about-1.jpg", description: "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum" },
        { id: 6, name: "Fruit Tea", image: "images/about-2.jpg", description: "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum" },
        { id: 7, name: "Chai Tea", image: "images/about-3.jpg", description: "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum" },
        { id: 8, name: "Matcha Tea", image: "images/about-4.jpg", description: "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum" }
    ];

    const topSeller = [
        { id: 1, name: "Nature close tea", image: "images/store-product-1.jpg", description: "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed", price: "$19.00" },
        { id: 2, name: "Green tea tulsi", image: "images/store-product-2.jpg", description: "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed", price: "$19.00" },
        { id: 3, name: "Instant tea premix", image: "images/store-product-3.jpg", description: "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed", price: "$19.00" }
    ];

    const handleNext = () => {
        setShowProducts(prev => prev + 4); // Increase the number of products to show by 4
    };

    const handlePrev = () => {
        setShowProducts(prev => prev - 4); // Decrease the number of products to show by 4
    };

    return (
        <>
            {/*Navbar*/}
            <div className="container-fluid bg-white sticky-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg bg-white navbar-light py-1 py-lg-0">
                        <Link to={"/"} className="navbar-brand">
                            <img className="img-fluid" src="." alt="Logo" />
                        </Link>
                        <button
                            type="button"
                            className="navbar-toggler ms-auto me-0"
                            onClick={toggleMenu}
                            aria-controls="navbarCollapse"
                            aria-expanded={isMenuOpen}
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarCollapse">
                            <div className="navbar-nav ms-auto">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                <Link to="/about" className="nav-item nav-link">About</Link>
                                <Link to="/products" className="nav-item nav-link">Products</Link>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle active" id="pagesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded={isMenuOpen}>
                                        Pages
                                    </a>
                                    <div className="dropdown-menu bg-light rounded-0 m-0" aria-labelledby="pagesDropdown">
                                        <Link to="/blog" className="dropdown-item active">Blog Article</Link>
                                        <Link to="/error" className="dropdown-item">404 Page</Link>
                                    </div>
                                </div>
                                <Link to="/contact" className="nav-item nav-link">Contact</Link>
                            </div>
                            <div className="border-start ps-4 d-none d-lg-block">
                                <button type="button" className="btn btn-sm p-0">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {/*Carousel*/}
            <div className="fade-bg">
                <div id="carouselExampleSlidesOnly" className="carousel slide mx-auto" data-bs-ride="carousel" ref={carouselRef}>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="carousel-overlay">
                                <h1 className="text-white">Big Text 1</h1>
                            </div>
                            <img src="../../public/images/carousel-2.jpg" className="d-block w-100" alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <div className="carousel-overlay">
                                <h1 className="text-white">Big Text 2</h1>
                            </div>
                            <img src="../../public/images/video-bg.jpg" className="d-block w-100" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <div className="carousel-overlay">
                                <h1 className="text-white">Big Text 3</h1>
                            </div>
                            <img src="../../public/images/carousel-2.jpg" className="d-block w-100" alt="Third slide" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Start */}
            <div className="container-fluid product py-5 my-5">
                <div className="container py-5">
                    <div className="section-title text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "500px" }}>
                        <p className="fs-5 fw-medium fst-italic text-primary">Our Products</p>
                        <h1 className="display-6">Tea has a complex positive effect on the body</h1>
                    </div>
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {products.slice(0, showProducts).map(product => (
                            <div key={product.id} className="col">
                                <div className="h-100">
                                    <img src={product.image} className="card-img-top" alt={product.name} />
                                    <div className="card-body">
                                        <p className="fw-medium text-muted text-center">{product.name}<i className="ms-1 bi bi-arrow-right"></i></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-success rounded-circle me-2" disabled={showProducts <= 4} onClick={handlePrev}><i className="bi bi-arrow-left"></i></button>
                        <button className="btn btn-success rounded-circle" disabled={showProducts >= products.length} onClick={handleNext}><i className="bi bi-arrow-right"></i></button>
                    </div>
                </div>
            </div>

            {/*Top Seller*/}
            <div className="container-xxl py-5">
            <div className="container">
                <div className="section-title text-center mx-auto" style={{ maxWidth: '500px' }}>
                    <p className="fs-5 fw-medium fst-italic text-primary">Best Seller</p>
                    <h1 className="display-6">Want the best tea? Choose from our Top Selling Products</h1>
                </div>
                <div className="row g-4">
                    {topSeller.map((product, index) => (
                        <div className="col-lg-4 col-md-6" key={product.id} data-wow-delay={`${0.1 * (index + 1)}s`}>
                            <div className="store-item position-relative text-center">
                                <img className="img-fluid" src={product.image} alt={product.name} />
                                <div className="p-4">
                                    <div className="text-center mb-3">
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                    </div>
                                    <h4 className="mb-3">{product.name}</h4>
                                    <p>{product.description}</p>
                                    <h4 className="text-primary">{product.price}</h4>
                                </div>
                                <div className="store-overlay">
                                    <a href="#" className="btn btn-primary rounded-pill py-2 px-4 m-2">More Detail <i className="fa fa-arrow-right ms-2"></i></a>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-12 text-center" data-wow-delay="0.1s">
                        <Link to="/products" className="btn btn-primary rounded-pill py-3 px-5">View More Products</Link>
                    </div>
                </div>
            </div>
        </div>

        {/* Contact */}
        <Contact/>
        
            {/*Footer*/}
        </>
    )
}