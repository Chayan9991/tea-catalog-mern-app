import { Link } from 'react-router-dom';
import { API_SERVER_BASE_URL } from '../data/constant';

const CategoryCard = ({ item }) => {
  return (
    <div 
      className="card mb-4" 
      style={{ 
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)", 
        transition: "transform 0.3s",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "250px", // Fixed width for uniformity
        height: "350px" // Fixed height for uniformity
      }}
    >
      <Link 
        to={`/product/${item._id}`} 
        className="card-link text-decoration-none"
        style={{ color: "inherit" }}
      >
        <div style={{ overflow: "hidden" }}>
          <img 
            src={`${API_SERVER_BASE_URL}/${item.imageUrl}`} 
            className="card-img-top" 
            alt={item.name} 
            style={{ 
              height: "200px", 
              objectFit: "cover", 
              transition: "transform 0.4s ease-in-out",
              display: "block"
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div className="card-body text-center" style={{ maxHeight: "100px", overflow: "hidden" }}>
          <h6 className="card-title mb-2" style={{ fontWeight: "500", margin: "0", padding: "0" }}>
            {item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name}
          </h6>
          <p className="card-text text-muted">Rs. ₹{item.price}</p>
        </div>
      </Link>
      <div className="card-footer text-center" style={{ borderTop: "none" }}>
        <Link 
          to={`/product/${item._id}`} 
          className="btn btn-outline-primary"
          style={{ 
            borderRadius: "20px", 
            fontSize: "0.9rem", 
            padding: "0.4rem 1rem", 
            transition: "background-color 0.3s, color 0.3s"
          }}
        >
          Check Details
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
