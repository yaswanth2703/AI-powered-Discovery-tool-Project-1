import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductList = ({ match }) => {
  const [products, setProducts] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const userId = match.params.userId || 'default-user-id'; // Replace with actual user auth

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(`/api/recommendations/${userId}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (match.params.userId) {
      fetchRecommendations();
    } else {
      fetchProducts();
    }
  }, [match.params.userId, userId]);

  const handlePreferenceSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/user/${userId}/preferences`, { preferences });
      alert('Preferences updated');
      // Refresh recommendations
      const res = await axios.get(`/api/recommendations/${userId}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>AI-Powered Product Discovery</h1>
      <form onSubmit={handlePreferenceSubmit}>
        <input
          type="text"
          placeholder="Enter preferences (comma-separated)"
          value={preferences.join(',')}
          onChange={(e) => setPreferences(e.target.value.split(','))}
        />
        <button type="submit">Update Preferences</button>
      </form>
      <div>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;