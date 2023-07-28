const express = require('express');
const app = express();
const scraperRoutes = require('./routes/scraper');

const PORT = 8000;

app.use(express.json());

// Define your routes here
app.use('/scraper', scraperRoutes);


// index.js
const { scrapeProductListings } = require('./utils/scraper');
const fs = require('fs');

(async () => {
  try {
    const productData = await scrapeProductListings();

    // Export data to CSV
    const csvData = Papa.unparse(productData);
    fs.writeFileSync('product_data.csv', csvData);

    console.log('Data scraped and exported successfully to product_data.csv');
  } catch (error) {
    console.error('Error:', error);
  }
})();


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});