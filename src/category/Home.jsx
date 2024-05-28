
import Contact from "./Contact";
import Carousel from "./Carousel";
import { Products } from "../data/Product";
import ProductCategory from "./ProductCategory";
import Footer from "./Footer";
import AboutUs from "./AboutUs";
import BriefAbout from "./BriefAbout";

export const Home = () => {
  const { productCategory, topSellingProduct } = Products();

  return (
    <>
      <Carousel />

      <ProductCategory productCategory={productCategory}/>
    
      {/* <TopSeller topSellingProduct={topSellingProduct} /> */}


      {/* Brief About Us */}

      <BriefAbout/>
      
      <Contact />
     
    <a href="#" className="btn btn-lg bg-primary btn-lg-square rounded-circle back-to-top"><i class="bi bi-arrow-up"></i></a> 

    </>
  );
};
