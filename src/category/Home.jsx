
import Contact from "./Contact";
import Carousel from "./Carousel";
import ProductCategory from "./ProductCategory";
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
