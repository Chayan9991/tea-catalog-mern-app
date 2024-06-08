import { Routes,Route } from "react-router-dom"
import { Home } from "../category/Home"
import AboutUs from './../category/AboutUs';
import Contact from "../category/Contact";
import AllProducts from "../category/AllProducts";
import SingleCategory from "../category/SingleCategory";
import SingleProduct from "../category/SingleProduct";
import AdminPanel from "../category/admin/AdminDashboard";
import ProductList from "../category/admin/ProductList";
import UpdateProduct from "../category/admin/UpdateProduct";
import AddProduct from "../category/admin/AddProduct";
import ProductCategory from './../category/admin/ProductCategory';
import AddCategory from "../category/admin/AddCategory";
import UpdateCategory from "../category/admin/UpdateCategory";
import Cart from "../category/Cart";
import OrderSuccess from "../category/OrderSuccess";
import AdminDashboard from "../category/admin/AdminDashboard";
import AddQuery from "../category/AddQuery";
import Queries from "../category/admin/Queries";

const Routing = () => {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/products" element={<AllProducts/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/productCategory/:categoryId" element={<SingleCategory/>} />
        <Route path="/product/:productId" element={<SingleProduct/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/orderSuccess" element={<OrderSuccess/>} />
        <Route path="/queries" element={<AddQuery/>} />


        {/* admin */}

        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/admin/products" element={<ProductList/>} />
        {/* <Route path="/admin/addProduct" component={CreateProduct} /> */}
        <Route path="/admin/editProduct/:productId" element={<UpdateProduct/>} />
        <Route path="/admin/addProduct" element={<AddProduct/>} />
        <Route path="/admin/category" element={<ProductCategory/>} />
        <Route path="/admin/addProductCategory" element={<AddCategory/>} />
        <Route path="/admin/editProductCategory/:categoryId" element={<UpdateCategory/>} />
        <Route path="/admin/queries" element={<Queries/>} />
      </Routes>
    </div>
  )
}

export default Routing