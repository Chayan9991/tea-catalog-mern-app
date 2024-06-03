import { Link } from "react-router-dom";

const Carousel = () => {
  const CarouselData = [
    {
      id: 1,
      image: "images/tea-image-1.jpg",
      carouselText: "WELCOME TO TEA HOUSE",
    },
    {
      id: 2,
      image: "images/tea-image-2.jpg",
      carouselText: "GET AUTHENTIC GREEN TEA",
    },
    {
      id: 3,
      image: "images/tea-image-3.jpg",
      carouselText: "DRING HEALTHY",
    },
    {
      id: 4,
      image: "images/tea-image-4.jpg",
      carouselText: "DRINK TASTY",
    },
    {
      id: 5,
      image: "images/tea-image-5.jpg",
      carouselText: "WITH AYURVEDIC BENIFITS",
    },
  ];

  return (
    <div className="container-fluid px-0 mb-5">
      <div
        id="header-carousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          {CarouselData.map((item) => (
            <div
              className={`carousel-item ${item.id === 1 ? "active" : ""}`}
              key={item.id}
            >
              <img className="w-100" src={item.image} alt="Image" />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-7 text-center">
                      <p className="fs-4 text-white carousel-text">
                        {item.carouselText}
                      </p>
                      <Link
                        to="/products"
                        className="btn btn-light rounded-pill py-3 px-5 carousel-text-link"
                      >
                        Explore More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#header-carousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#header-carousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
