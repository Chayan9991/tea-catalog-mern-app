import { createContext, useState, useEffect } from "react";
import axios from 'axios';



const CategoryProductContext = createContext(); 

const CategoryProductProvider =({children})=>{
     const [categories, setCategories] = useState([]); 
     const [products, setProducts] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null); 

     const fetchData = async()=>{
        try{
            const categoryResponse = await axios.get("http://localhost:5000/getAllCategories");
            const productResponse = await axios.get("http://localhost:5000/getAllProducts"); 
    
            setCategories(categoryResponse.data.data); 
            setProducts(productResponse.data.data); 
            setLoading(true); 
        }catch(error){
            setError(error.message);
            setLoading(false);
        }
     } 

     useEffect(()=>{ 
         fetchData(); 
     },[]); 

     const refreshData = () => {
        setLoading(true);
        fetchData();
      };

      return (
        <CategoryProductContext.Provider value={{ categories, products, loading, error, refreshData }}>
          {children}
        </CategoryProductContext.Provider>
      );
}


export { CategoryProductContext, CategoryProductProvider };