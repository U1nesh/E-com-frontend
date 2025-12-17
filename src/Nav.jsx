import React from 'react';
import { Link } from 'react-router-dom'; 
import './ProductStyles.css'; 

function Nav() { 
 return (
   <nav className="nav-bar"> 
    <div className="nav-container">
     <Link to="/" className="brand-name">
      U1'S MART
     </Link>
    <div className="nav-links-right">
      <Link to="/" className="nav-link">
       Home
      </Link>
      <Link to="/cart" className="nav-link cart-link">
       Cart 
      </Link>

     <Link to="/contect" className="nav-link">
       Contact
      </Link>
     </div>
   </div>
  </nav>
 );
}

export default Nav;