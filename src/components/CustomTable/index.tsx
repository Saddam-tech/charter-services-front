import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
    id: 'id' | 'type' | 'date' | 'p_location' | 'd_location' | 'email' | 'phone';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'Id', minWidth: 30 },
    { id: 'type', label: 'Type', minWidth: 100 },
    {
        id: 'date',
        label: 'Service Date',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'p_location',
        label: 'Pick-up Location',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'd_location',
        label: 'Drop-off Location',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'phone',
        label: 'Phone Number',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    id: number;
    type: string;
    date: string;
    p_location: string;
    d_location: string;
    email: string;
    phone: string;
}

function createData(
    id: number,
    type: string,
    date: string,
    p_location: string,
    d_location: string,
    email: string,
    phone: string
): Data {
    return { id, type, date, p_location, d_location, email, phone };
}

const rows = [
    createData(1, 'Airport pick-up/drop-off', '2024-12-04 07:24 pm', 'Seoul', 'New York', 'tatebrothers@gmail.com', '+129 2398 2398'),
    createData(2, 'Airport pick-up/drop-off', '2024-12-04 07:24 pm', 'Seoul', 'New York', 'tatebrothers@gmail.com', '+129 2398 2398'),
    createData(3, 'Airport pick-up/drop-off', '2024-12-04 07:24 pm', 'Seoul', 'New York', 'tatebrothers@gmail.com', '+129 2398 2398'),
    createData(4, 'Airport pick-up/drop-off', '2024-12-04 07:24 pm', 'Seoul', 'New York', 'tatebrothers@gmail.com', '+129 2398 2398'),
    createData(5, 'Airport pick-up/drop-off', '2024-12-04 07:24 pm', 'Seoul', 'New York', 'tatebrothers@gmail.com', '+129 2398 2398'),
    createData(6, 'Airport pick-up/drop-off', '2024-12-04 07:24 pm', 'Seoul', 'New York', 'tatebrothers@gmail.com', '+129 2398 2398'),
    createData(7, 'Airport pick-up/drop-off', '2024-12-04 07:24 pm', 'Seoul', 'New York', 'tatebrothers@gmail.com', '+129 2398 2398'),
    createData(8, 'Airport pick-up/drop-off', '2024-12-04 07:24 pm', 'Seoul', 'New York', 'tatebrothers@gmail.com', '+129 2398 2398'),
    createData(9, 'Airport pick-up/drop-off', '2024-12-04 07:24 pm', 'Seoul', 'New York', 'tatebrothers@gmail.com', '+129 2398 2398'),
    createData(11, 'Airport pick-up/drop-off', '2024-12-04 07:24 pm', 'Seoul', 'New York', 'tatebrothers@gmail.com', '+129 2398 2398'),
    createData(12, 'Airport pick-up/drop-off', '2024-12-04 07:24 pm', 'Seoul', 'New York', 'tatebrothers@gmail.com', '+129 2398 2398'),
    createData(13, 'Airport pick-up/drop-off', '2024-12-04 07:24 pm', 'Seoul', 'New York', 'tatebrothers@gmail.com', '+129 2398 2398'),
    createData(14, 'Airport pick-up/drop-off', '2024-12-04 07:24 pm', 'Seoul', 'New York', 'tatebrothers@gmail.com', '+129 2398 2398'),
];

export default function CustomTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
