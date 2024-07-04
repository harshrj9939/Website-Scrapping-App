import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Button } from '@mui/material';
import axios from 'axios';

const CompanyTable = ({ companies, setCompanies, onDelete, onView }) => {
    const [selected, setSelected] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const companiesPerPage = 10;

    const handleSelect = (id) => {
        setSelected((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter(sid => sid !== id) : [...prevSelected, id]
        );
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelecteds = companies.map((company) => company._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleDelete = async () => {
        try {
            await axios.post('/api/delete', { ids: selected });
            setCompanies(companies.filter((company) => !selected.includes(company._id)));
            setSelected([]);
        } catch (error) {
            console.error('Error deleting companies:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastCompany = currentPage * companiesPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
    const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleDelete} disabled={!selected.length}>
                Delete
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={selected.length > 0 && selected.length < companies.length}
                                checked={companies.length > 0 && selected.length === companies.length}
                                onChange={handleSelectAll}
                            />
                        </TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell>Social Profiles</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Phone No.</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentCompanies.map((company) => (
                        <TableRow key={company._id} selected={selected.includes(company._id)}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selected.includes(company._id)}
                                    onChange={() => handleSelect(company._id)}
                                />
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.socialProfiles}</TableCell>
                            <TableCell>{company.description}</TableCell>
                            <TableCell>{company.address}</TableCell>
                            <TableCell>{company.phone}</TableCell>
                            <TableCell>{company.email}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => onView(company._id)}>View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div>
                {Math.ceil(companies.length / companiesPerPage) > 1 && (
                    <div>
                        {[...Array(Math.ceil(companies.length / companiesPerPage)).keys()].map((page) => (
                            <Button key={page + 1} onClick={() => handlePageChange(page + 1)}>
                                {page + 1}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyTable;