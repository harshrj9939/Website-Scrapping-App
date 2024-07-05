import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import ScrapeForm from './components/ScrapeForm';
import CompanyTable from './components/CompanyTable';
import CompanyDetails from './components/CompanyDetails';
import CSVDownload from './components/CSVDownload';

const App = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('/api/companies');
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };
        fetchCompanies();
    }, []);

    const handleScraped = (company) => {
        setCompanies([...companies, company.company]);
    };

    const handleDelete = async (ids) => {
        await axios.delete('/api/companies', { data: { ids } });
        setCompanies(companies.filter(company => !ids.includes(company._id)));
    };

    return (
        <Router>
            <Container>
                <ScrapeForm onScraped={handleScraped} />
                <CSVDownload companies={companies} />
                <CompanyTable companies={companies} setCompanies={setCompanies} onDelete={handleDelete} />
                <Routes>
                    <Route path="/companies/:id" element={<CompanyDetails />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
