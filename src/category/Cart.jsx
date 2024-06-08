import React, { useContext, useEffect, useState } from "react";
import { CategoryProductContext } from "../context/CategoryProductContext";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import axios from 'axios'
import { API_SERVER_BASE_URL } from "../data/constant";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    setCartItems,
    removeItemFromCart,
    cartTotal,
    setCartTotal,
  } = useContext(CategoryProductContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  useEffect(() => {
    setCartTotal(() => {
      let sum = 0;
      cartItems.forEach((item) => {
        sum += item.totalPrice;
      });
      return sum;
    });
  }, [cartItems]);

  const handleRemove = (itemId) => {
    removeItemFromCart(itemId);
  };

  const handleProceedToCheckout = async () => {
    const checkoutData = {
      ...formData,
      totalCartValue: cartTotal,
      cartDetails: cartItems.map((item) => ({
        id: item._id,
        name: item.name,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      })),
    };
  
    try {
      const response = await axios.post(`${API_SERVER_BASE_URL}/orders`, checkoutData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) { 
        // on proceed to checkout .. the cart will be deleted and cartTotal will be 0
        cartItems.map((item) => {
          removeItemFromCart(item._id);
        });
        setCartTotal(0);
        // Order successfully created, redirect or display success message
        navigate("/orderSuccess");
      } else {
        // Handle error response from server
        console.error("Error creating order:", response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error sending request:", error);
    }
  };
  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container-fluid">
      <div className="cart-container">
        <p className="text-center text-muted h3 mb-3">Your Cart</p>
        {cartItems.length > 0 ? (
          <div className="row">
            <div className="col-12 col-md-6">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th className="text-uppercase text-muted small">Product</th>
                    <th className="text-uppercase text-muted small">Price</th>
                    <th className="text-uppercase text-muted small">
                      Quantity
                    </th>
                    <th className="text-uppercase text-muted small">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item._id}
                      item={item}
                      handleRemove={handleRemove}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-12 col-md-6">
              <div className="checkout-form">
                <p className="text-start text-uppercase small fw-bold text-muted">
                  Subtotal: ₹{cartTotal}
                </p>
                <p className="fw-semibold text-center text-uppercase text-muted">
                  ---- Order Details ----
                </p>
                <form>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleFormChange}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows="4"
                    value={formData.message}
                    onChange={handleFormChange}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column">
            <p className="text-center">---- Your cart is empty ----</p>
            <Link
              to="/products"
              className="btn btn-sm rounded-2 "
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#20948b",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
