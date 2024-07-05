const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const path = require('path');
const Company = require('../models/Company');
const fs = require('fs');
const router = express.Router();

// Ensure the screenshots directory exists
const screenshotsDir = path.join(__dirname, '../screenshots');
if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
}

const captureScreenshot = async (url, filename) => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.screenshot({ path: filename, fullPage: true });
        await browser.close();
    } catch (error) {
        console.error(`Error capturing screenshot: ${error}`);
        throw error;
    }
};

router.post('/scrape', async (req, res) => {
    const { url } = req.body;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const name = $('meta[property="og:site_name"]').attr('content') || $('title').text();
        const description = $('meta[name="description"]').attr('content');
        const logo = $('meta[property="og:image"]').attr('content');
        const facebook = $('a[href*="facebook.com"]').attr('href');
        const linkedin = $('a[href*="linkedin.com"]').attr('href');
        const twitter = $('a[href*="twitter.com"]').attr('href');
        const instagram = $('a[href*="instagram.com"]').attr('href');
        const address = $('[itemprop="address"]').text() || $('[class*="address"]').text();
        const phone = $('[itemprop="telephone"]').text() || $('[class*="phone"]').text();
        const email = $('[itemprop="email"]').text() || $('[class*="email"]').text();

        // Capture screenshot
        const screenshotFilename = `screenshots/${Date.now()}.png`;
        const screenshotPath = path.join(__dirname, '../', screenshotFilename);
        await captureScreenshot(url, screenshotPath);

        const newCompany = new Company({
            name,
            description,
            logo,
            facebook,
            linkedin,
            twitter,
            instagram,
            address,
            phone,
            email,
            screenshot: screenshotFilename,
        });

        await newCompany.save();
        res.json(newCompany);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error scraping the website');
    }
});

router.get('/companies', async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching companies');
    }
});

router.post('/delete', async (req, res) => {
    const { ids } = req.body;
    try {
        await Company.deleteMany({ _id: { $in: ids } });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting companies');
    }
});

router.get('/companies/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        res.json(company);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching company details');
    }
});

module.exports = router;
