import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const CompanyDetails = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const fetchCompany = async () => {
            const response = await axios.get(`/api/companies/${id}`);
            setCompany(response.data);
        };
        fetchCompany();
    }, [id]);

    if (!company) return null;

    return (
        <Card>
            <CardMedia component="img" image={`/${company.screenshot}`} alt={`${company.name} screenshot`} />
            <CardContent>
                <Typography variant="h5">{company.name}</Typography>
                <Typography variant="body2">{company.description}</Typography>
                <Typography variant="body2">Facebook: {company.facebook}</Typography>
                <Typography variant="body2">LinkedIn: {company.linkedin}</Typography>
                <Typography variant="body2">Twitter: {company.twitter}</Typography>
                <Typography variant="body2">Instagram: {company.instagram}</Typography>
                <Typography variant="body2">Address: {company.address}</Typography>
                <Typography variant="body2">Phone: {company.phone}</Typography>
                <Typography variant="body2">Email: {company.email}</Typography>
            </CardContent>
        </Card>
    );
};

export default CompanyDetails;
