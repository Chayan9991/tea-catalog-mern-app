import { Routes,Route } from "react-router-dom"
import { Home } from "../category/Home"
import AboutUs from './../category/AboutUs';
import Products from "../category/Products";
import Contact from "../category/Contact";
import SingleCategory from "../category/SingleCategory";

const Routing = () => {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="//productCategory/:id" element={<SingleCategory/>} />
      </Routes>
    </div>
  )
}

export default Routing