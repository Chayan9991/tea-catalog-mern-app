import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_SERVER_BASE_URL } from "../data/constant";

const CategoryProductContext = createContext();



const CategoryProductProvider = ({ children }) => {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const categoryResponse = await axios.get(
        `${API_SERVER_BASE_URL}/getAllCategories`  //https://tea-catalog-backend-1.onrender.com(render)
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
      value={{ categories, products, loading, error, refreshData }}
    >
      {children}
    </CategoryProductContext.Provider>
  );
};

export { CategoryProductContext, CategoryProductProvider };
