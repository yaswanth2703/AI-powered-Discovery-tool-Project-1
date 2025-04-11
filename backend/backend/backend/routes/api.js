const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get recommended products for a user
router.get('/recommendations/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('viewedProducts');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Simple recommendation logic: suggest products matching user preferences
    const recommendations = await Product.find({
      $or: [
        { category: { $in: user.preferences } },
        { tags: { $in: user.preferences } },
      ],
    }).limit(10);

    // Placeholder for advanced AI recommendation (e.g., collaborative filtering)
    // Integrate TensorFlow.js or external ML API here
    // Example: const aiRecommendations = await callMLModel(user, products);

    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user preferences
router.post('/user/:userId/preferences', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.preferences = req.body.preferences;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Log product view
router.post('/user/:userId/view/:productId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const product = await Product.findById(req.params.productId);
    if (!user || !product) return res.status(404).json({ message: 'Not found' });

    if (!user.viewedProducts.includes(product._id)) {
      user.viewedProducts.push(product._id);
      await user.save();
    }
    res.json({ message: 'View logged' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;