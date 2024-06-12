import { useContext, useEffect, useState } from "react";
import { CategoryProductContext } from "../context/CategoryProductContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_SERVER_BASE_URL } from "../data/constant";
import {
  currencyConversion,
  getCurrencySymbol,
} from "./../data/currencyConversion";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems, currency, removeItemFromCart } = useContext(
    CategoryProductContext
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [cartTotalValue, setCartTotalValue] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

  const calculateCartTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setCartTotalValue(total);
  };

  const handleRemove = (itemId) => {
    removeItemFromCart(itemId);
  };

  const handleQuantityChange = (itemId, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
    );
  };

  const handleProceedToCheckout = async () => {
    const checkoutData = {
      ...formData,
      totalCartValue: cartTotalValue,
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
        cartItems.forEach((item) => {
          removeItemFromCart(item._id);
        });
        setCartTotalValue(0);
        navigate("/orderSuccess");
      } else {
        console.error("Error creating order:", response.statusText);
      }
    } catch (error) {
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
            <div className="col-md-8">
              <div className="table-responsive" style={{ maxHeight: "auto", overflowY: "auto" }}>
                <table className="cart-table ">
                  <thead>
                    <tr className="small">
                      <th className="text-uppercase text-muted small">Product</th>
                      <th className="text-uppercase text-muted small">Price</th>
                      <th className="text-uppercase text-muted small">Quantity</th>
                      <th className="text-uppercase text-muted small">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td className="d-flex align-items-center">
                          <button
                            className="btn btn-sm text-danger me-2"
                            onClick={() => handleRemove(item._id)}
                          >
                            <i className="bi bi-x-circle"></i>
                          </button>
                          <img
                            className="me-3"
                            src={item.imageUrl}
                            alt={item.name}
                            width="50"
                            height="50"
                          />
                          <div className="d-flex flex-column">
                            <p className="small fw-bold text-green text-uppercase mb-1">
                              {item.name}
                            </p>
                            <p className="small text-muted">This item description</p>
                          </div>
                        </td>
                        <td className="small fw-semibold text-muted">
                          {getCurrencySymbol(currency)}&nbsp;{currencyConversion(item.price, currency)}
                        </td>
                        <td className="cart-item-quantity" data-label="Quantity">
                          <div className="small quantity-control d-flex align-items-center justify-content-center">
                            <button
                              className="btn btn-sm"
                              onClick={() => handleQuantityChange(item._id, -1)}
                              disabled={item.quantity <= 1}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <input
                              className="form-control text-center quantity-input small"
                              type="number"
                              min="1"
                              value={item.quantity}
                              readOnly
                              aria-label={`Quantity of ${item.name}`}
                              style={{ width: "60px" }}
                            />
                            <button
                              className="btn btn-sm"
                              onClick={() => handleQuantityChange(item._id, 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </td>
                        <td className="small fw-bold">
                          {getCurrencySymbol(currency)}&nbsp;{currencyConversion(item.price * item.quantity, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-4">
              <div className="checkout-form">
                <p className="text-start text-uppercase small fw-bold text-muted">
                  Subtotal: &nbsp;{getCurrencySymbol(currency)}&nbsp;
                  {currencyConversion(cartTotalValue, currency)}
                </p>
                <p className="fw-semibold text-center text-uppercase text-muted">
                  ---- Order Details ----
                </p>
                <form>
                  <div className="mb-3">
                    <input
                      placeholder="Name"
                      type="text"
                      className="form-control small"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      placeholder="Email"
                      type="email"
                      className="form-control small"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      placeholder="Phone No."
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
                    <input
                      placeholder="Address"
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
                    <textarea
                      placeholder="Message"
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
