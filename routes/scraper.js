// routes/scraper.js
const express = require('express');
const router = express.Router();
const scraperUtils = require('../utils/scraper');

router.get('/listings', async (req, res) => {
  try {
    const { page } = req.query;
    const productData = await scraperUtils.scrapeProductListings(page);
    res.json(productData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/details', async (req, res) => {
  try {
    const { url } = 'https://www.amazon.in/s?k=bags&crid=2M096C61O4MLT&qid=1653308124&sprefix=ba%2Caps%2C283&ref=sr_pg_1';
    const productDetails = await scraperUtils.scrapeProductDetails(url);
    res.json(productDetails);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
