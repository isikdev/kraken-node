const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3000;

app.get('*', async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(`https://kraken18.at${req.originalUrl}`, {
            waitUntil: 'networkidle2',
        });
        const content = await page.content();
        await browser.close();
        res.send(content);
    } catch (error) {
        console.error('Error occurred:', error.message);
        res.status(500).send('Something went wrong.');
    }
});

app.listen(PORT, () => {
    console.log(`Puppeteer proxy server is running on port ${PORT}`);
});
