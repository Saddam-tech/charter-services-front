import { Collapse, List, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BannerTable from 'components/BannerTable';
import Button from '@mui/material/Button';
import NewBanner from '../NewBanner';
import Backdrop from 'components/Backdrop';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

interface Data {
    id: number;
    img: React.ReactElement;
    order: number;
    active: boolean;
    url: string;
    edit: React.ReactElement;
    settings: React.ReactElement;
}


const imgUrl = 'https://lp-cms-production.imgix.net/2020-11/Hemphill%20celebrity%20bus.jpg'
const deleteIcon = <DeleteIcon />;
const editIcon = <EditIcon />

const dummySections = [
    [{ id: 1, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 1, active: true, url: imgUrl, edit: editIcon, settings: deleteIcon },
    { id: 2, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 2, active: false, url: imgUrl, edit: editIcon, settings: deleteIcon },
    { id: 3, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 3, active: false, url: imgUrl, edit: editIcon, settings: deleteIcon },
    { id: 4, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 4, active: false, url: imgUrl, edit: editIcon, settings: deleteIcon },],
    [{ id: 1, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 1, active: true, url: imgUrl, edit: editIcon, settings: deleteIcon },
    { id: 2, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 2, active: false, url: imgUrl, edit: editIcon, settings: deleteIcon },
    { id: 3, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 3, active: false, url: imgUrl, edit: editIcon, settings: deleteIcon },
    { id: 4, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 4, active: false, url: imgUrl, edit: editIcon, settings: deleteIcon },],
    [{ id: 1, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 1, active: true, url: imgUrl, edit: editIcon, settings: deleteIcon },
    { id: 2, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 2, active: false, url: imgUrl, edit: editIcon, settings: deleteIcon },
    { id: 3, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 3, active: false, url: imgUrl, edit: editIcon, settings: deleteIcon },
    { id: 4, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 4, active: false, url: imgUrl, edit: editIcon, settings: deleteIcon },],
    [{ id: 1, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 1, active: true, url: imgUrl, edit: editIcon, settings: deleteIcon },
    { id: 2, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 2, active: false, url: imgUrl, edit: editIcon, settings: deleteIcon },
    { id: 3, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 3, active: false, url: imgUrl, edit: editIcon, settings: deleteIcon },
    { id: 4, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 4, active: false, url: imgUrl, edit: editIcon, settings: deleteIcon },],
    [{ id: 1, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 1, active: true, url: imgUrl, edit: editIcon, settings: deleteIcon },
    { id: 2, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 2, active: false, url: imgUrl, edit: editIcon, settings: deleteIcon },
    { id: 3, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 3, active: false, url: imgUrl, edit: editIcon, settings: deleteIcon },
    { id: 4, img: <img style={{ maxWidth: '100px' }} src={imgUrl} alt="banner" />, order: 4, active: false, url: imgUrl, edit: editIcon, settings: deleteIcon },],
]


const Banners = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const [sections, setSections] = useState<Data[][]>(dummySections);

    function handleItemClick(id: number) {
        if (selectedId === id) {
            setIsCollapsed(!isCollapsed);
        } else {
            setSelectedId(id);
            setIsCollapsed(false);
        }
    }
    return (
        <Container>
            <HeaderWrap>
                <h2>Banner Management</h2>
            </HeaderWrap>
            <ThemeProvider theme={theme}>
                <Paper sx={{ width: '100%', overflow: 'hidden', margin: '30px 0' }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableBody>
                                {new Array(4).fill('*')
                                    .map((row, i) => {
                                        const isSelected = i === selectedId && !isCollapsed;
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                                <TableCell sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%', cursor: 'pointer' }} key={row.id}>
                                                    <ListItemButton onClick={() => handleItemClick(i)}>
                                                        Section {i + 1}
                                                        {isSelected ? <ExpandLess /> : <ExpandMore />}
                                                    </ListItemButton>
                                                    <Collapse in={isSelected} timeout="auto" unmountOnExit>
                                                        <List sx={{ display: 'flex', alignItem: 'flex-end', justifyContent: 'flex-end', flexDirection: 'column', gap: '10px' }} component="div" disablePadding>
                                                            <BannerTable data={sections[i]} setData={setSections} sectionIndex={i} />
                                                            <Button onClick={() => setModal(true)} sx={{ maxWidth: '200px', backgroundColor: '#c69536', color: '#ffffff' }} variant="contained">New Banner</Button>
                                                        </List>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </ThemeProvider>
            {modal && <Backdrop close={() => setModal(false)}>
                <NewBanner />
            </Backdrop>}
        </Container>
    )
}

export default Banners

const Container = styled.section`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: 100%;
padding: 0 10px;
`;

const HeaderWrap = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    flex-direction: column;
`;

const ListItemButton = styled.section`
 display: flex; 
 align-items: center; 
 justify-content: space-between; 
 width: 100%; 
 padding: 10px;
`
