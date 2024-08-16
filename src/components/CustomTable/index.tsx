import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Order, StatusKey } from 'configs/types';
import { mapStatusToString } from 'configs/constants';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

interface Column {
    id: 'type' | 'date' | 'pickup_location' | 'dropoff_location' | 'email' | 'phonenumber' | 'status';
    label: string;
    minWidth?: number;
    align?: 'left';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'type', label: 'Type', minWidth: 100 },
    {
        id: 'date',
        label: 'Service Date',
        minWidth: 170,
        align: 'left',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'pickup_location',
        label: 'Pick-up Location',
        minWidth: 170,
        align: 'left',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'dropoff_location',
        label: 'Drop-off Location',
        minWidth: 170,
        align: 'left',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'left',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'phonenumber',
        label: 'Phone Number',
        minWidth: 170,
        align: 'left',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'left',
        format: (value: number) => value.toFixed(2),
    },
];


export default function CustomTable({ orders }: { orders: Order[] }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const navigate = useNavigate();
    const location = useLocation();
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
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
                        {orders
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell onClick={() => navigate(`${location.pathname}/${row.orderid}`)} key={column.id} align={column.align}>
                                                    {column.id === 'status' ? mapStatusToString[value as StatusKey] : column.id === 'date' ? dayjs(value).format('YYYY-MM-DD hh:mm a') : column.format && typeof value === 'number'
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
                rowsPerPageOptions={[10, 25, 30]}
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
