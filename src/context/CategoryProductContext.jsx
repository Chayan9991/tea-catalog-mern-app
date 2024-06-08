import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_SERVER_BASE_URL } from "../data/constant";

const CategoryProductContext = createContext();



const CategoryProductProvider = ({ children }) => {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[cartItems, setCartItems] = useState([]); 
  const[cartTotal, setCartTotal] = useState(0); 

  const[orders, setOrders] = useState([]); 
  const[queries,setQueries] = useState([]); 

   // Add item to cart
  const addItemToCart = (item, quantity) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem._id === item._id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        existingItem.quantity += quantity;
        return updatedItems;
      }
      
      return [...prevItems, { ...item, quantity }];
    });
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item._id !== itemId));
  };


  const fetchData = async () => {
    try {
      const categoryResponse = await axios.get(
        `${API_SERVER_BASE_URL}/getAllCategories`  //https://tea-catalog-backend.onrender.com(render)
      );
      const productResponse = await axios.get(
        `${API_SERVER_BASE_URL}/getAllProducts`
      );

      setCategories(categoryResponse.data.data);
      setProducts(productResponse.data.data);
      setLoading(false); // Set loading to false after data fetch
    } catch (error) {
      setError(error.message);
      setLoading(false); // Ensure loading is set to false on error as well
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    setLoading(true);
    fetchData();
  };

  return (
    <CategoryProductContext.Provider
      value={{queries, setQueries, orders, setOrders, categories, products, loading, error, refreshData,cartItems,setCartItems, addItemToCart, removeItemFromCart, cartTotal, setCartTotal }}
    >
      {children}
    </CategoryProductContext.Provider>
  );
};

export { CategoryProductContext, CategoryProductProvider };
