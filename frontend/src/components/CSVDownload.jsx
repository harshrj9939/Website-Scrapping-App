import React from 'react';
import { Button } from '@mui/material';
import { CSVLink } from 'react-csv';

const CSVDownload = ({ companies }) => {
    const headers = [
        { label: "Name", key: "name" },
        { label: "Description", key: "description" },
        { label: "Logo", key: "logo" },
        { label: "Facebook", key: "facebook" },
        { label: "LinkedIn", key: "linkedin" },
        { label: "Twitter", key: "twitter" },
        { label: "Instagram", key: "instagram" },
        { label: "Address", key: "address" },
        { label: "Phone", key: "phone" },
        { label: "Email", key: "email" },
        { label: "Screenshot", key: "screenshot" }
    ];

    const data = companies.map(company => ({
        name: company.name || "",
        description: company.description || "",
        logo: company.logo || "",
        facebook: company.facebook || "",
        linkedin: company.linkedin || "",
        twitter: company.twitter || "",
        instagram: company.instagram || "",
        address: company.address || "",
        phone: company.phone || "",
        email: company.email || "",
      }));

    return (
        <Button variant="contained" color="primary">
            <CSVLink data={companies} headers={headers} filename={"companies.csv"} style={{ color: 'inherit', textDecoration: 'none' }}>
                Download CSV
            </CSVLink>
        </Button>
    );
};

export default CSVDownload;
