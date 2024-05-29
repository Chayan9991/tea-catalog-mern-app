import React from 'react'
import { useParams } from 'react-router-dom'
import ProductCategory from './ProductCategory';
import { Products } from '../data/Product';

const SingleProduct = () => {
  const{productId} = useParams(); 
  const{allProductData}  = Products(); 

  const item = allProductData.find(prod => prod.id === parseInt(productId));


  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center">
        <div style={{ width: '300px', height: '300px' }}>
            <img 
              src={item.image} 
              alt="Product" 
              className="img-fluid" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>  
        </div>
        <div className="col-md-6 product-details">
          <h1 className="heading text-center" style={{fontSize:"1.5em", marginTop:"0"}}>{item.title}</h1>
          <div className="product-description mt-5">
          <p className="" style={{ fontSize: ".85em" }}>Price: {item.price}</p>
          <p className="" style={{ fontSize: ".85em" }}>Description: {item.description}</p>
          </div>
        </div>
      </div>
      </div>
  )
}

export default SingleProduct