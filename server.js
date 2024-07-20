const express = require('express');
const axios = require('axios');

const app = express();
const API_KEY = '3c12cb5597eeb472e12b3d011f266077';
const PORT = 3000;

app.use('/', async (req, res) => {
    try {
        const url = `https://kraken18.at${req.originalUrl}`;
        console.log(`Requesting URL: ${url}`);
        const response = await axios.get(`http://api.scraperapi.com`, {
            params: {
                api_key: API_KEY,
                url: url,
                ultra_premium: true 
            }
        });
        res.send(response.data);
    } catch (error) {
        console.error('Error occurred:', error.message);
        console.error('Error response:', error.response ? error.response.data : 'No response data');
        res.status(500).send('Something went wrong.');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
