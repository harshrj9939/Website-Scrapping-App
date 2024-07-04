const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const cheerio = require('cheerio');

dotenv.config();

const app = express();
const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000; // Define PORT and provide a default value

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON bodies
app.use(express.json());

// Define Schema and Model
const companySchema = new mongoose.Schema({
  name: String,
  description: String,
  logo: String,
  facebook: String,
  linkedin: String,
  twitter: String,
  instagram: String,
  address: String,
  phone: String,
  email: String
});

const Company = mongoose.model('Company', companySchema);

// Scrape route
app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const name = $('meta[property="og:site_name"]').attr('content') || $('title').text();
    const description = $('meta[name="description"]').attr('content') || 'No description available';
    const logo = $('link[rel="icon"]').attr('href') || 'No logo available';
    const facebook = $('a[href*="facebook.com"]').attr('href') || 'No Facebook URL';
    const linkedin = $('a[href*="linkedin.com"]').attr('href') || 'No LinkedIn URL';
    const twitter = $('a[href*="twitter.com"]').attr('href') || 'No Twitter URL';
    const instagram = $('a[href*="instagram.com"]').attr('href') || 'No Instagram URL';
    const address = $('address').text() || 'No address available';
    const phone = $('a[href^="tel:"]').text() || 'No phone number available';
    const email = $('a[href^="mailto:"]').text() || 'No email available';

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
      email
    });

    await newCompany.save();

    res.status(200).json({ message: 'Scraping successful', company: newCompany });
  } catch (error) {
    console.error('Error scraping the website:', error);
    res.status(500).json({ message: 'Scraping failed', error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
