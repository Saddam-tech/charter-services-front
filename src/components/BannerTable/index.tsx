import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';

interface Column {
    id: 'id' | 'img' | 'order' | 'active' | 'url' | 'settings'
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'Id', minWidth: 30 },
    { id: 'img', label: 'Image', minWidth: 100 },
    {
        id: 'order',
        label: 'View Order',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'active',
        label: 'Active',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'url',
        label: 'Url',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'settings',
        label: 'Delete',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
];

interface Data {
    id: number;
    img: React.ReactElement;
    order: number;
    active: React.ReactNode;
    url: string;
    settings: React.ReactElement;
}

function createData(
    id: number,
    img: React.ReactElement,
    order: number,
    active: React.ReactNode,
    url: string,
    settings: React.ReactElement,
): Data {
    return { id, img, order, active, url, settings };
}


export default function BannerTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [switchState, setSwitchState] = React.useState<boolean>(false);
    const imgUrl = 'https://lp-cms-production.imgix.net/2020-11/Hemphill%20celebrity%20bus.jpg'

    const switcher = (<Switch
        edge="end"
        onChange={() => setSwitchState(!switchState)}
        checked={switchState}
        inputProps={{
            'aria-labelledby': 'switch-list-label-wifi',
        }}
    />);
    const deleteIcon = <DeleteIcon />

    const rows = [
        createData(1, <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, 1, switcher, imgUrl, deleteIcon),
        createData(2, <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, 2, switcher, imgUrl, deleteIcon),
        createData(3, <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, 3, switcher, imgUrl, deleteIcon),
        createData(4, <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, 4, switcher, imgUrl, deleteIcon),
        createData(5, <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, 5, switcher, imgUrl, deleteIcon),
    ];

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
