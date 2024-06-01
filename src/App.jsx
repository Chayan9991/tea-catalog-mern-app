import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import Routing from "./routes/Routing.jsx";
import Navbar from "./category/Navbar.jsx";
import Footer from "./category/Footer.jsx";
import { useLocation } from "react-router-dom";
import AdminNavbar from "./category/admin/AdminNavbar.jsx";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <Routing />
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && (
        <a
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="btn btn-lg bg-secondary btn-lg-square rounded-circle back-to-top"
        >
          <i className="bi bi-arrow-up"></i>
        </a>
      )}
    </>
  );
}

export default App;
