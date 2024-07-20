const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AnonymizeUAPlugin = require('puppeteer-extra-plugin-anonymize-ua');
const app = express();

puppeteer.use(StealthPlugin());
puppeteer.use(AnonymizeUAPlugin());

const PORT = 3000;

app.get('*', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--proxy-server=socks5://127.0.0.1:9050', // Подключение к локальному Tor прокси
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
        const page = await browser.newPage();
        await page.goto(`http://kbge6oeffrl2fohzgzniuosm2yu2emtnvrwfhafuq6bylhiyazri3nad.onion${req.originalUrl}`, {
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
    console.log(`Tor Puppeteer proxy server is running on port ${PORT}`);
});
