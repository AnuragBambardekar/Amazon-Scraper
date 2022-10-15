const express = require('express'); //to create backend JS server
const request = require('request-promise'); //to make API requests

const app = express();
const PORT = process.env.PORT || 5000;

const API_KEY = ''; //Insert your API Key
const baseUrl = `http://api.scraperapi.com?api_key=${API_KEY}&autoparse=true`;

//const returnScraperApiUrl = (API_KEY) => `http://api.scraperapi.com?api_key=${API_KEY}&autoparse=true`;

app.use(express.json());

//Welcome Route
app.get('/',(req,res) => {
    res.send('Welcome to Amazon Scraper API.');
});

//GET Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/dp/${productId}`);
        //const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.in/dp/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/product-reviews/${productId}`);
        //const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.in/product-reviews/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/gp/offer-listing/${productId}`);
        //const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.in/gp/offer-listing/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;
    
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/s?k=${searchQuery}`);
        //const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.in/s?k=${searchQuery}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
