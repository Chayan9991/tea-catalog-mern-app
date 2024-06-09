import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./index.css";
import Routing from "./routes/Routing.jsx";
import Navbar from "./category/Navbar.jsx";
import Footer from "./category/Footer.jsx";
import { useLocation } from "react-router-dom";
import AdminNavbar from "./category/admin/AdminNavbar.jsx";
import { useState, useEffect } from 'react';


function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) { // Adjust the value as needed
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <Routing />
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && isVisible && (
        <a
          onClick={scrollToTop}
          className="btn btn-lg btn-lg-square rounded-circle"
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'pointer',
            transition: 'opacity 0.3s ease, visibility 0.3s ease',
            opacity: 1,
            visibility: 'visible',
            backgroundColor: '#20948B'
          }}
        >
          <i className="bi bi-arrow-up" style={{ color: 'white', fontSize: '1.5rem' }}></i>
        </a>
      )}
    </div>
  );
}

export default App;
