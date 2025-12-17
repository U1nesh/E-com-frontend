// import React from 'react';

// import mugImage from './assets/mug.jpg';
// import headphonesImage from './assets/headphones.jpg';
// import walletImage from './assets/wallet.jpg';
// import chairImage from './assets/chair.jpg';
// import laptopImage from './assets/laptop.jpg';

// const getLocalImage = (id) => {
//     switch(id) {
//         case 1: return mugImage;
//         case 2: return headphonesImage;
//         case 3: return walletImage;
//         case 4: return chairImage;
//         case 5: return laptopImage;
//         default: return mugImage; 
//     }
// }

// function Cart({ cartItems, removeFromCart }) { 
  
//   const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

//   return (
//     <div className="cart-page-container">
//       <h2 className="cart-heading">Your Shopping Cart ({cartItems.length} items)</h2>

//       {cartItems.length === 0 ? (
//         <p className="cart-empty-message">Your cart is empty. Add some items!</p>
//       ) : (
//         <div className="cart-items-wrapper">
//           {cartItems.map((item, index) => (
//             <div 
//                 key={index} 
//                 className="cart-item-row"
//             >
//                 <div className="cart-item-details">
//                     <img 
//                         src={getLocalImage(item.id)} // Use local image
//                         alt={item.name} 
//                         className="cart-item-image"
//                     />
//                     <div>
//                         <h4 className="cart-item-name">{item.name}</h4>
//                         <p className="cart-item-price">Rs. {item.price.toFixed(2)}</p>
//                     </div>
//                 </div>
                
//                 <button 
//                     onClick={() => removeFromCart(item.id)} 
//                     className="cart-remove-button"
//                 >
//                     Remove Item
//                 </button>
//             </div>
//           ))}
          
//           <div className="cart-total-section">
//             <span className="cart-total-label">Cart Total:</span>
//             <span className="cart-total-amount">Rs. {cartTotal.toFixed(2)}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;