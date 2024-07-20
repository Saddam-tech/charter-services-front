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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const theme = createTheme({
    palette: {
        primary: {
            main: '#c69536',
        },
        secondary: {
            main: '#c6963685',
        },
    },
});

interface Column {
    id: 'id' | 'urlToS3' | 'sequence' | 'active' | 'edit' | 'delete' | 'text' | 'head';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'urlToS3', label: 'Image', minWidth: 100 },
    {
        id: 'head',
        label: 'Header',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'text',
        label: 'Body',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'sequence',
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
        id: 'edit',
        label: '',
        minWidth: 50,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'delete',
        label: '',
        minWidth: 50,
        align: 'right',
        format: (value: number) => (value ? value.toLocaleString('en-US') : '-'),
    },
];

interface Data {
    id?: number;
    urlToS3?: string;
    sequence?: number;
    active?: boolean;
    edit?: React.ReactElement;
    delete?: React.ReactElement;
    head?: string;
    text?: string;
    uuid?: string;
}

export default function BannerTable({
    rows,
    currentIndex,
    handleAddBanner,
    setRows,
    setDeleteItemUUID,
    setAlertDialog,
}: {
    rows: Data[]
    currentIndex: number
    handleAddBanner: (index: number) => void
    setRows: React.Dispatch<React.SetStateAction<Data[]>>
    setDeleteItemUUID: React.Dispatch<React.SetStateAction<string>>
    setAlertDialog: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [editingId, setEditingId] = React.useState<number | null>(null);
    const [editedData, setEditedData] = React.useState<Data>({});
    const fileInputRef = React.useRef<HTMLInputElement>(null);

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

    function handleEdit(id: number) {
        setEditingId(id);
        const itemToEdit = rows.find((item) => item.id === id);
        if (itemToEdit) {
            setEditedData(itemToEdit);
        }
    }

    function handleImageClickWhileEditing() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    function navigateUrlToImage(urlPath: string | undefined) {
        if (urlPath) {
            window.open(urlPath, '_blank');
        }
    }

    function handleDeleteItem(uuid: string | undefined) {
        if (uuid) {
            setDeleteItemUUID(uuid);
            setAlertDialog(true);
        }
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setEditedData((prev) => ({ ...prev, urlToS3: URL.createObjectURL(file) }));
        }
    }

    function handleSave() {
        const updatedList = rows.map((item) =>
            item.id === editingId ? { ...item, ...editedData } : item
        );
        setRows(updatedList);
        setEditingId(null);
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
                                    const isEditing = row.id === editingId;
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = isEditing ? column.id === 'urlToS3' ? (
                                                    <>
                                                        <img
                                                            onClick={handleImageClickWhileEditing}
                                                            style={{ maxWidth: '100px' }}
                                                            src={editedData.urlToS3 || row.urlToS3}
                                                            alt="banner"
                                                        />
                                                        <input
                                                            ref={fileInputRef}
                                                            id="bannerInput"
                                                            type="file"
                                                            name="imageInput"
                                                            onChange={handleFileChange}
                                                            hidden
                                                        />
                                                    </>
                                                )
                                                    : column.id === 'sequence'
                                                        ? (
                                                            <TextField
                                                                value={editedData.sequence || ''}
                                                                onChange={(event) =>
                                                                    setEditedData((prev) => ({
                                                                        ...prev,
                                                                        order: parseInt(event.target.value),
                                                                    }))
                                                                }
                                                                type="number"
                                                                fullWidth
                                                            />
                                                        )
                                                        : column.id === 'head'
                                                            ? (
                                                                <TextField
                                                                    value={editedData.head || ''}
                                                                    onChange={(event) =>
                                                                        setEditedData((prev) => ({
                                                                            ...prev,
                                                                            head: event.target.value,
                                                                        }))
                                                                    }
                                                                    type="text"
                                                                    fullWidth
                                                                />
                                                            )
                                                            : column.id === 'text'
                                                                ? (
                                                                    <TextField
                                                                        value={editedData.text || ''}
                                                                        onChange={(event) =>
                                                                            setEditedData((prev) => ({
                                                                                ...prev,
                                                                                text: event.target.value,
                                                                            }))
                                                                        }
                                                                        type="text"
                                                                        fullWidth
                                                                    />
                                                                )
                                                                : column.id === 'active'
                                                                    ? (
                                                                        <Switch
                                                                            edge="end"
                                                                            onChange={() =>
                                                                                setEditedData((prev) => ({
                                                                                    ...prev,
                                                                                    active: !prev.active,
                                                                                }))
                                                                            }
                                                                            checked={!!editedData.active}
                                                                        />
                                                                    )
                                                                    : row[column.id]
                                                    : column.id === 'urlToS3' ? <img
                                                        onClick={() => navigateUrlToImage(row.urlToS3)}
                                                        style={{ maxWidth: '100px' }}
                                                        src={editedData.urlToS3 || row.urlToS3}
                                                        alt="banner"
                                                    />
                                                        : column.id === 'edit' ? <EditIcon onClick={() => handleEdit(row.id!)} />
                                                            : column.id === 'active' ? (
                                                                <Switch
                                                                    edge="end"
                                                                    onChange={() => handleSwitch(index)}
                                                                    checked={row.active}
                                                                />
                                                            )
                                                                : column.id === 'delete' ? <DeleteIcon onClick={() => handleDeleteItem(row.uuid)} />
                                                                    : row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            {isEditing && (<>
                                                <TableCell colSpan={columns.length}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleSave}
                                                    >
                                                        Save
                                                    </Button>
                                                </TableCell>
                                                <TableCell colSpan={columns.length}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleSave}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </TableCell>
                                            </>
                                            )}
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
            <Button
                onClick={() => handleAddBanner(currentIndex)}
                sx={{ maxWidth: '200px', backgroundColor: '#c69536', color: '#ffffff' }}
                variant="contained"
            >
                New Banner
            </Button>
        </ThemeProvider>
    );
}
