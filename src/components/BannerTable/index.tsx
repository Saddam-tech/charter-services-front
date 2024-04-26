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
import { createTheme, ThemeProvider } from '@mui/material/styles';


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
    active: boolean;
    url: string;
    settings: React.ReactElement;
}


export default function BannerTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const imgUrl = 'https://lp-cms-production.imgix.net/2020-11/Hemphill%20celebrity%20bus.jpg'
    const deleteIcon = <DeleteIcon />;
    const [rows, setRows] = React.useState<Data[]>([
        { id: 1, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 1, active: true, url: imgUrl, settings: deleteIcon },
        { id: 2, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 2, active: false, url: imgUrl, settings: deleteIcon },
        { id: 3, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 3, active: false, url: imgUrl, settings: deleteIcon },
        { id: 4, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 4, active: false, url: imgUrl, settings: deleteIcon },
    ]);

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
        setRows(updatedList);
    }

    function handleAddBanner() { }

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
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </ThemeProvider>
    );
}
