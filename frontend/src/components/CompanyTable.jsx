import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Button } from '@mui/material';
import axios from 'axios';

const CompanyTable = ({ companies, setCompanies, onDelete, onView }) => {
    const [selected, setSelected] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const companiesPerPage = 10;

    // Handle individual row selection
    const handleSelect = (id) => {
        setSelected((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter(sid => sid !== id) : [...prevSelected, id]
        );
    };

    // Handle select/deselect all rows
    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelecteds = companies.map((company) => company._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    // Handle deletion of selected companies
    const handleDelete = async () => {
        try {
            await axios.post('/api/delete', { ids: selected });
            setCompanies(companies.filter((company) => !selected.includes(company._id)));
            setSelected([]);
        } catch (error) {
            console.error('Error deleting companies:', error);
        }
    };

    // Handle pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastCompany = currentPage * companiesPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
    const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

    return (
        <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                    <span style={{ marginRight: '8px' }}>{selected.length} selected</span>
                    <Button variant="contained" color="secondary" onClick={handleDelete} disabled={!selected.length}>
                        Delete
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => handlePageChange(1)}>
                        Export as CSV
                    </Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '16px' }}>Showing {indexOfFirstCompany + 1}-{indexOfLastCompany} of {companies.length}</span>
                    {Math.ceil(companies.length / companiesPerPage) > 1 && (
                        <div>
                            <Button variant="contained" color="primary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                <span style={{ marginRight: '4px' }}>&lt;</span>
                                1
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => handlePageChange(currentPage)}>
                                {currentPage}
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(companies.length / companiesPerPage)}>
                                {currentPage + 1}
                            </Button>
                            <span>...</span>
                            <Button variant="contained" color="primary" onClick={() => handlePageChange(Math.ceil(companies.length / companiesPerPage))}>
                                100
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(companies.length / companiesPerPage)}>
                                &gt;
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <Table style={{ borderCollapse: 'collapse' }}>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox" style={{ width: '40px', borderBottom: '1px solid #ddd' }}>
                            <Checkbox
                                indeterminate={selected.length > 0 && selected.length < companies.length}
                                checked={companies.length > 0 && selected.length === companies.length}
                                onChange={handleSelectAll}
                                style={{ color: '#000' }}
                            />
                        </TableCell>
                        <TableCell style={{ width: '40px', borderBottom: '1px solid #ddd' }}>Logo</TableCell>
                        <TableCell style={{ borderBottom: '1px solid #ddd' }}>COMPANY</TableCell>
                        <TableCell style={{ borderBottom: '1px solid #ddd' }}>DESCRIPTION</TableCell>
                        <TableCell style={{ borderBottom: '1px solid #ddd' }}>ADDRESS</TableCell>
                        <TableCell style={{ borderBottom: '1px solid #ddd' }}>PHONE NO.</TableCell>
                        <TableCell style={{ borderBottom: '1px solid #ddd' }}>EMAIL</TableCell>
                        <TableCell style={{ width: '40px', borderBottom: '1px solid #ddd' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentCompanies.map((company) => (
                        <TableRow key={company._id} selected={selected.includes(company._id)} style={{ borderBottom: '1px solid #ddd' }}>
                            <TableCell padding="checkbox" style={{ width: '40px' }}>
                                <Checkbox
                                    checked={selected.includes(company._id)}
                                    onChange={() => handleSelect(company._id)}
                                    style={{ color: '#000' }}
                                />
                            </TableCell>
                            <TableCell style={{ width: '40px' }}>
                                {company.logo ? <img src={company.logo} alt="logo" style={{ width: '50px' }} /> : ''}
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.description}</TableCell>
                            <TableCell>{company.address || 'No Address'}</TableCell>
                            <TableCell>{company.phone || 'No Phone'}</TableCell>
                            <TableCell>{company.email || 'No Email'}</TableCell>
                           
                            <TableCell style={{ width: '40px' }}>
                                <Button variant="contained" color="primary" onClick={() => onView(company._id)} style={{ padding: '8px 12px' }}>
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompanyTable;