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
import EditIcon from '@mui/icons-material/Edit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';


const theme = createTheme({
    palette: {
        primary: {
            main: '#c69536'
        },
        secondary: {
            main: '#c6963685'
        }
    },
});

interface Column {
    id: 'id' | 'img' | 'order' | 'active' | 'url' | 'edit' | 'settings' | 'text'
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'img', label: 'Image', minWidth: 100 },
    {
        id: 'text',
        label: 'Text',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
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
        id: 'edit',
        label: '',
        minWidth: 50,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'settings',
        label: '',
        minWidth: 50,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    }
];

interface Data {
    id?: number;
    img?: React.ReactElement;
    order?: number;
    active?: boolean;
    url?: React.ReactElement;
    edit?: React.ReactElement;
    settings?: React.ReactElement;
    text?: string;
}


export default function BannerTable({ rows, currentIndex, handleAddBanner }: { rows: Data[], currentIndex: number, handleAddBanner: (index: number) => void }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function handleSwitch(index: number) {
        const updatedList = rows.map((el, i) => {
            if (index === i) {
                el.active = !el.active;
            }
            return el;
        });
        // setRows(updatedList);
    }

    return (
        <ThemeProvider theme={theme}>
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
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = column.id === 'active' ? (
                                                    <Switch
                                                        edge="end"
                                                        onChange={() => handleSwitch(index)}
                                                        checked={row?.active}
                                                        disabled={false}
                                                        inputProps={{
                                                            'aria-labelledby': 'switch-list-label-wifi',
                                                        }}
                                                    />
                                                ) : row[column.id];
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
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Button onClick={() => handleAddBanner(currentIndex)} sx={{ maxWidth: '200px', backgroundColor: '#c69536', color: '#ffffff' }} variant="contained">New Banner</Button>
        </ThemeProvider>
    );
}
