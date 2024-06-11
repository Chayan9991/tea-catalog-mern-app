import React, { useContext, useEffect, useState } from "react";
import { CategoryProductContext } from "../context/CategoryProductContext";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import axios from "axios";
import { API_SERVER_BASE_URL } from "../data/constant";

const Cart = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
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
      const response = await axios.post(
        `${API_SERVER_BASE_URL}/orders`,
        checkoutData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
    <div className="container-fluid" >
      <div className="cart-container">
        <p className="text-center text-muted h3 mb-3">Your Cart</p>
        {cartItems.length > 0 ? (
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="">
                {cartItems.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    handleRemove={handleRemove}
                  />
                ))}
              </div>
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
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleFormChange}
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary mt-2 w-100"
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
              className="btn btn-sm rounded-2 col-md-6 offset-md-3"
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
