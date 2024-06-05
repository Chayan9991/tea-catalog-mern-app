import React, { useContext } from 'react';
import { CategoryProductContext } from '../context/CategoryProductContext';
import { API_SERVER_BASE_URL } from '../data/constant';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeItemFromCart, updateCartQuantity } = useContext(CategoryProductContext);

  const handleRemove = (itemId) => {
    removeItemFromCart(itemId);
  };

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity >= 1) {
      updateCartQuantity(itemId, quantity);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container container mt-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div className="cart-content">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item d-flex flex-column flex-md-row align-items-center mb-4 p-3 border rounded">
              <img
                src={`${API_SERVER_BASE_URL}/${item.imageUrl}`}
                alt={item.name}
                className="cart-item-image mb-3 mb-md-0"
                style={{ width: '150px', height: 'auto', borderRadius: '5px' }}
              />
              <div className="cart-item-details flex-grow-1 mx-3">
                <h5>{item.name}</h5>
                <p>Price: ₹{item.price}</p>
                <div className="d-flex align-items-center">
                  <label htmlFor={`quantity-${item._id}`} className="me-2">Quantity:</label>
                  <input
                    id={`quantity-${item._id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                    className="form-control w-auto"
                  />
                </div>
              </div>
              <button
                className="btn btn-sm bg-danger text-white"
                onClick={() => handleRemove(item._id)}
              >
                Delete
              </button>
            </div>
          ))}
          <div className="text-end mt-4">
            <h4>Total: ₹{totalPrice}</h4>
            <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>
          </div>
        </div>
      ) : (
        <p className="text-center">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
