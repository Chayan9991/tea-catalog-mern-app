
import Contact from "./Contact";
import Carousel from "./Carousel";
import { Products } from "../data/Product";
import ProductCategory from "./ProductCategory";
import Footer from "./Footer";
import AboutUs from "./AboutUs";
import BriefAbout from "./BriefAbout";

export const Home = () => {
 
  return (
    <>
      <Carousel />

      <ProductCategory />
    
      {/* <TopSeller topSellingProduct={topSellingProduct} /> */}


      {/* Brief About Us */}

      <BriefAbout/>
      
      <Contact />

    </>
  );
};
