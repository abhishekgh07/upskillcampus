const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Review = require('../models/Review');

// ADD SERVICE
router.post('/', async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.json({ message: 'Service added!', service });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add service' });
  }
});

// GET ALL SERVICES
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// ADD REVIEW
router.post('/review', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.json({ message: 'Review added!', review });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// GET ALL REVIEWS
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;