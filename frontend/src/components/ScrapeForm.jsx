import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Snackbar, Alert } from '@mui/material';

const ScrapeForm = ({ onScraped }) => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    const handleScrape = async () => {
        try {
            const response = await axios.post('/api/scrape', { url });
            console.log('Scraped Data:', response.data);
            onScraped(response.data);
            setOpen(true);
        } catch (error) {
            console.error('Scraping Error:', error);
            setError(error.response ? error.response.data.message : 'Scraping failed');
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <TextField 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                label="Website URL" 
                fullWidth 
                margin="normal"
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleScrape}
                style={{ marginTop: '10px' }}
            >
                Scrape
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Scraping successful!
                </Alert>
            </Snackbar>
        </div>
    );
    
};

export default ScrapeForm;
