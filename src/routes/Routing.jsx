import { Routes,Route } from "react-router-dom"
import { Home } from "../category/Home"
import AboutUs from './../category/AboutUs';
import Contact from "../category/Contact";
import AllProducts from "../category/AllProducts";
import SingleCategory from "../category/SingleCategory";
import SingleProduct from "../category/SingleProduct";

const Routing = () => {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/products" element={<AllProducts/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/productCategory/:categoryId" element={<SingleCategory/>} />
        <Route path="/product/:id" element={<SingleProduct/>} />
      </Routes>
    </div>
  )
}

export default Routing