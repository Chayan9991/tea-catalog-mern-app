import { useState, useEffect, useContext } from "react";
import { CategoryProductContext } from "../context/CategoryProductContext";

const CartItem = ({ item, handleRemove }) => {
  const { cartTotal, setCartTotal } = useContext(CategoryProductContext);

  const [quantity, setQuantity] = useState(item.quantity || 1); // Set default or retrieved quantity
  const [totalPrice, setTotalPrice] = useState(quantity * item.price);

  const [prevTotalPrice, setPrevTotalPrice] = useState(0); // Initialize prevTotalPrice

useEffect(() => {
  // Update cart total on quantity or price change
  setCartTotal((prevCartTotal) => prevCartTotal + (totalPrice - prevTotalPrice));
  setPrevTotalPrice(totalPrice); // Update prevTotalPrice after each change
}, [quantity, item.price, totalPrice, cartTotal]);

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

  return (
    <tr className="">
      <td>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-sm text-danger bg-outline-white me-1"
            onClick={() => {
              handleRemove(item._id);
              // Update cart total on item removal
              setCartTotal(cartTotal - totalPrice);
            }}
          >
            <i className="bi bi-trash"></i>{" "}
          </button>
          <img className="me-3" src={`${item.imageUrl}`} alt={item.name} />
          <p className="small text-muted">{item.name}</p>
        </div>
      </td>
      <td className="fw-semibold small">₹{item.price}</td>
      <td className="cart-item-quantity">
        <button className="btn btn-sm fw-bold rounded-5" onClick={handleDecrease}>
          -
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setQuantity(value);
          }}
        />
        <button className="btn btn-sm fw-bold rounded-5" onClick={handleIncrease}>
          +
        </button>
      </td>
      <td>₹{totalPrice}</td>
    </tr>
  );
};

export default CartItem;
