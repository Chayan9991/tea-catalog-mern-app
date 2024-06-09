import { useState, useEffect, useContext } from "react";
import { CategoryProductContext } from "../context/CategoryProductContext";

const CartItem = ({ item, handleRemove }) => {
  const { cartItems, setCartItems, cartTotal, setCartTotal } = useContext(
    CategoryProductContext
  );

  const [quantity, setQuantity] = useState(item.quantity);
  const [totalPrice, setTotalPrice] = useState(item.quantity * item.price);
  const [prevTotalPrice, setPrevTotalPrice] = useState(totalPrice);

  useEffect(() => {
    setPrevTotalPrice(totalPrice);
  }, []); // Run once on component mount to initialize prevTotalPrice

  useEffect(() => {
    setCartTotal(
      (prevCartTotal) => prevCartTotal + (totalPrice - prevTotalPrice)
    );
    const updatedItems = cartItems.map((cartItem) =>
      cartItem._id === item._id
        ? { ...cartItem, quantity, totalPrice }
        : cartItem
    );
    setCartItems(updatedItems);
  }, [quantity, totalPrice]);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setTotalPrice((quantity - 1) * item.price);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    setTotalPrice((quantity + 1) * item.price);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
      setTotalPrice(value * item.price);
      setCartTotal(cartTotal + (value - quantity) * item.price);
    }
  };

  return (
    <div className="table-responsive mb-3">
      <table className="cart-table">
        <thead>
          <tr className="small">
            <th className="text-uppercase text-muted small">Product</th>
            <th className="text-uppercase text-muted small">Price</th>
            <th className="text-uppercase text-muted small">Quantity</th>
            <th className="text-uppercase text-muted small">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Product">
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-sm text-danger bg-outline-white me-2"
                  onClick={() => {
                    handleRemove(item._id);
                    setCartTotal(cartTotal - totalPrice);
                  }}
                  aria-label={`Remove ${item.name}`}
                >
                  <i className="bi bi-trash"></i>
                </button>
                <img
                  className="me-3"
                  src={item.imageUrl}
                  alt={item.name}
                  width="50"
                  height="50"
                />
                <p className="small text-muted mt-3 product-name">
                  {item.name}
                </p>
              </div>
            </td>
            <td className="fw-semibold small" data-label="Price">
              ₹{item.price}
            </td>
            <td className="cart-item-quantity" data-label="Quantity">
              <div className="small quantity-control d-flex align-items-center justify-content-center">
                <button
                  className="btn btn-sm"
                  onClick={handleDecrease}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  <i className="bi bi-dash"></i>
                </button>
                <input
                  className="form-control text-center quantity-input "
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  aria-label={`Quantity of ${item.name}`}
                  style={{ width: "50px" }}
                />
                <button
                  className="btn btn-sm"
                  onClick={handleIncrease}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </td>
            <td className="small fw-bold" data-label="Total">
              ₹{totalPrice}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartItem;
