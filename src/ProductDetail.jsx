import React from 'react';
import { useParams } from 'react-router-dom'; 
import PRODUCTS from './productsData'; 

import mugImage from './assets/mug.jpg';
import headphonesImage from './assets/headphones.jpg';
import walletImage from './assets/wallet.jpg';
import chairImage from './assets/chair.jpg';
import laptopImage from './assets/laptop.jpg';

const getLocalImage = (id) => {
    switch(id) {
        case 1: return mugImage;
        case 2: return headphonesImage;
        case 3: return walletImage;
        case 4: return chairImage;
        case 5: return laptopImage;
        default: return mugImage; 
    }
}


function ProductDetail({ addToCart }) { 
  const { id } = useParams(); 
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="product-detail-page">Product not found!</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        
        <img 
          src={getLocalImage(product.id)} 
          alt={product.name} 
          className="detail-image" 
        />
        
        <div className="detail-info">
          <h1 className="detail-name">{product.name}</h1>
          
          <h2 className="detail-price">Rs. {product.price.toFixed(2)}</h2>
          
          <h3 className="detail-description-heading">Product Description:</h3>
          <p className="detail-description-text">
            {product.description}
          </p>
          
          <button 
              onClick={() => addToCart(product)} 
              className="add-to-cart-button"
          >
              Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;