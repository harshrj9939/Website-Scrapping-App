// src/components/PaginationControls.jsx

import React from 'react';
import { TablePagination, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const PaginationControls = ({ page, rowsPerPage, count, handlePageChange, handleRowsPerPageChange }) => {
    return (
        <div className="pagination-container">
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </div>
    );
};

export default PaginationControls;
