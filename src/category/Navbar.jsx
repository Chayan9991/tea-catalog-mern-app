import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryProductContext } from "../context/CategoryProductContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, currency, setCurrency } = useContext(
    CategoryProductContext
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const cartQuantity = cartItems.length;

  // #6AB187

  return (
    <div
      className="container-fluid sticky-top"
      style={{ backgroundColor: "#20948B" }}
    >
      <div className="container">
        <nav
          className="navbar navbar-expand-lg py-1 py-lg-0"
          style={{ backgroundColor: "#20948B" }}
        >
          <Link to="/" className="navbar-brand">
            <img
              className="img-fluid logo"
              src="images/tea-logo.png"
              alt="Logo"
            />
            <span
              className="text-white fw-semibold small text-uppercase"
              style={{ fontSize: ".75em" }}
            >
              Tea Store
            </span>
          </Link>
          <div className="d-flex align-items-center ms-auto">
            <Link
              to="/cart"
              className={`nav-link position-relative ${
                cartQuantity === 0 ? "disabled" : ""
              } d-lg-none me-3`}
            >
              <i
                className="bi bi-cart-fill text-white"
                style={{ fontSize: "1.5rem" }}
              ></i>
              {cartQuantity > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {cartQuantity}
                </span>
              )}
            </Link>
            <button
              type="button"
              className={`navbar-toggler ${isMenuOpen ? "collapsed" : ""}`}
              onClick={toggleMenu}
              aria-controls="navbarCollapse"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
            >
              <span className="toggler-icon top-bar"></span>
              <span className="toggler-icon middle-bar"></span>
              <span className="toggler-icon bottom-bar"></span>
            </button>
          </div>
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarCollapse"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <hr className="my-0 hr-line" />
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Products
                </Link>
                <hr className="my-0 hr-line" />
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
                <hr className="my-0 hr-line" />
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
                <hr className="my-0 hr-line" />
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cartQuantity > 0 && (
                    <span className="badge bg-danger ms-0">{cartQuantity}</span>
                  )}
                </Link>
                <hr className="my-0 hr-line" />
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Settings
                </a>
                <ul
                  className="dropdown-menu small"
                  aria-labelledby="navbarDropdown"
                  style={{
                    background:
                      "linear-gradient(135deg, #20948B 0%, #7BDFC1 100%)",
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.5rem 0",
                  }}
                >
                  <li className="dropdown-item">
                    <div className="d-flex align-items-center">
                      <span className="me-2 small">Currency</span>
                      <select
                        className="form-select custom-select form-select-sm w-auto"
                        value={currency}
                        onChange={handleCurrencyChange}
                      >
                        <option value="inr">₹ INR</option>
                        <option value="usd">$ USD</option>
                        <option value="gbp">£ GBP</option>
                      </select>
                    </div>
                  </li>
                  <li>
                    <Link to="/admin" className="dropdown-item small">
                      Admin
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
