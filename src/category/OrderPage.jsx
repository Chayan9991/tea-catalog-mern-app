import React, { useState } from 'react';
import ShoppingCart from './ShoppingCart';

const OrderPage = () => {
  const [items] = useState([
    { id: 1, name: 'Item 1', price: 100 },
    { id: 2, name: 'Item 2', price: 200 },
    { id: 3, name: 'Item 3', price: 300 },
  ]);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const itemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (itemIndex >= 0) {
      const newCart = [...cartItems];
      newCart[itemIndex].quantity += 1;
      setCartItems(newCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Products</h1>
      <div className="row">
        {items.map(item => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Price: ₹{item.price}</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ShoppingCart cartItems={cartItems} />
    </div>
  );
};

export default OrderPage;
