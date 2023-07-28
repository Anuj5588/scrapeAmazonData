// utils/scraper.js
const axios = require('axios');
const cheerio = require('cheerio');
const Papa = require('papaparse');
const fs = require('fs');

const base_url = "https://www.amazon.in/s?k=bags&crid=2M096C61O4MLT&qid=1653308124&sprefix=ba%2Caps%2C283&ref=sr_pg_1";
const num_pages_to_scrape = 20;

async function scrapeProductListings() {
  const productData = [];

  for (let page = 1; page <= num_pages_to_scrape; page++) {
    const page_url = base_url + page;
    const response = await axios.get(page_url);
    const $ = cheerio.load(response.data);
    const product_list = $('.s-result-item');

    product_list.each((index, element) => {
      const product_url = $(element).find('.a-link-normal').attr('href');
      const product_name = $(element).find('.a-text-normal').text().trim();
      const product_price = $(element).find('.a-offscreen').text().trim();
      const product_rating = $(element).find('.a-icon-alt').text().split(' ')[0] || 'N/A';
      const num_reviews = $(element).find('.a-size-base').text().trim();

      productData.push({
        'Product URL': 'https://www.amazon.in' + product_url,
        'Product Name': product_name,
        'Product Price': product_price,
        'Rating': product_rating,
        'Number of Reviews': num_reviews,
      });
    });
  }

  return productData;
}

module.exports = {
  scrapeProductListings,
};
