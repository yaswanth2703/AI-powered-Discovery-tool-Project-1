import React from 'react';
import axios from 'axios';

const ProductCard = ({ product, userId }) => {
  const handleView = async () => {
    try {
      await axios.post(`/api/user/${userId}/view/${product._id}`);
      console.log('Product view logged');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <button onClick={handleView}>View Product</button>
    </div>
  );
};

export default ProductCard;