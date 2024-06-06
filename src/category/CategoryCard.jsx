// src/components/CategoryCard.jsx

import { Link } from 'react-router-dom';
import { API_SERVER_BASE_URL } from '../data/constant';
import { useContext } from 'react';
import { CategoryProductContext } from '../context/CategoryProductContext';

const CategoryCard = ({ item }) => {
  const { addItemToCart, cartItems } = useContext(CategoryProductContext);

  const handleAddToCart = (item) => {
    addItemToCart(item);
  };

  const isItemInCart = cartItems.some(cartItem => cartItem._id === item._id);

  return (
    <div 
      className="card mb-3" 
      style={{ 
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)", 
        transition: "transform 0.3s",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "260px", 
        height: "325px"
      }}
    >
      <Link 
        to={`/product/${item._id}`} 
        className="card-link text-decoration-none"
        style={{ color: "inherit" }}
      >
        <div style={{ overflow: "hidden" }}>
          <img 
            src={`${item.imageUrl}`} 
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
        <div className="card-body text-center" style={{ maxHeight: "68px", overflow: "hidden" }}>
          <h6 className="card-title mb-1" style={{ fontWeight: "500", margin: "0", padding: "0" }}>
            {item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name}
          </h6>
          <p className="card-text text-muted" style={{fontSize:".85em"}}>Starts from ₹{item.price}</p>
        </div>
      </Link>
      <div className="card-footer text-center mb-3" style={{ borderTop: "none", display: "flex", justifyContent: "space-around", backgroundColor:"white" }}>
        <button 
          className={`btn btn-sm `}
          style={{ 
            color:"white",
            backgroundColor:"#20948B",
            borderRadius: "10px", 
            fontSize: "0.75rem", 
            padding: "",
            transition: "background-color 0.3s, color 0.3s",
            flex: 1,
            margin: ""
          }}
          onClick={() => handleAddToCart(item)}
          disabled={isItemInCart}
        >
          {isItemInCart ? 'Added' : 'Add To Cart'}
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
