import { useState, useEffect, useContext } from "react";
import { CategoryProductContext } from "../context/CategoryProductContext";

const CartItem = ({ item, handleRemove }) => {
  const { cartItems, setCartItems, cartTotal, setCartTotal } = useContext(CategoryProductContext);

  const [quantity, setQuantity] = useState(item.quantity);
  const [totalPrice, setTotalPrice] = useState(item.quantity * item.price);
  const [prevTotalPrice, setPrevTotalPrice] = useState(totalPrice);

  useEffect(() => {
    setPrevTotalPrice(totalPrice);
  }, []); // Run once on component mount to initialize prevTotalPrice

  useEffect(() => {
    setCartTotal((prevCartTotal) => prevCartTotal + (totalPrice - prevTotalPrice));
    const updatedItems = cartItems.map(cartItem =>
      cartItem._id === item._id ? { ...cartItem, quantity, totalPrice } : cartItem
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

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-sm text-danger bg-outline-white me-1"
            onClick={() => {
              handleRemove(item._id);
              setCartTotal(cartTotal - totalPrice);
            }}
          >
            <i className="bi bi-trash"></i>
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
            setTotalPrice(value * item.price);
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
