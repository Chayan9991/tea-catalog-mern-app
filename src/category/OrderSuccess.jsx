import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using react-router for navigation

const OrderSuccess = () => {
    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },[])
  return (
    <div  style={{ textAlign: 'center', marginTop: '100px', minHeight:"50vh" }}>
      <h1>Order Success</h1>
      <p>Thank you for your purchase!</p>
      <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderSuccess;
