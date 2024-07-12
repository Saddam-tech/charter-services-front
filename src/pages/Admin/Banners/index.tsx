import { Collapse, List, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BannerTable from 'components/BannerTable';
import NewBanner from '../NewBanner';
import Backdrop from 'components/Backdrop';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { EPS, provider } from 'configs/axios';

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
    id?: number;
    img?: React.ReactElement;
    order?: number;
    active?: boolean;
    url?: React.ReactElement;
    edit?: React.ReactElement;
    settings?: React.ReactElement;
    head?: string;
    text?: string;
}


const Banners = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [currentSection, setCurrentSection] = useState<number | null>(null)
    const [modal, setModal] = useState<boolean>(false);
    const [rows, setRows] = React.useState<Data[]>([]);

    async function loadBanners(section_id: number) {
        try {
            const { data: { response } } = await provider.get(EPS.BANNERS + `?section=${section_id}`);
            console.log({ response });
            let newRows: Data[] = [];
            for (let el of response) {
                let item: Data = {};
                item.id = el.id;
                item.img = <img style={{ maxWidth: '100px' }} src={el.urlToS3} alt="banner" />;
                item.active = el.active;
                item.order = el.sequence;
                item.url = <a href={el.urlToS3} target="_blank" rel="noreferrer">{el.urlToS3.slice(0, 35) + ' ... ' + el.urlToS3.slice(-25)}</a>
                item.edit = <EditIcon />;
                item.settings = <DeleteIcon />;
                item.text = el.text ?? '-';
                item.head = el.head ?? '-';
                newRows.push(item);
            }
            setRows(newRows);
        } catch (err) {
            console.log(err);
        }
    }

    function handleItemClick(id: number) {
        if (selectedId === id) {
            setIsCollapsed(!isCollapsed);
        } else {
            setSelectedId(id);
            setIsCollapsed(false);
        }
        let _currentSection = id + 1;
        setCurrentSection(_currentSection);
        loadBanners(_currentSection);
    }
    function handleAddBanner(index: number) {
        setModal(true);
        console.log({ bannerIndex: index });
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
                                {new Array(3).fill('*')
                                    .map((row, i) => {
                                        const isSelected = i === selectedId && !isCollapsed;
                                        let currentSection = i + 1;
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                                <TableCell sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%', cursor: 'pointer' }} key={row.id}>
                                                    <ListItemButton onClick={() => handleItemClick(i)}>
                                                        Section {currentSection}
                                                        {isSelected ? <ExpandLess /> : <ExpandMore />}
                                                    </ListItemButton>
                                                    <Collapse in={isSelected} timeout="auto" unmountOnExit>
                                                        <List sx={{ display: 'flex', alignItem: 'flex-end', justifyContent: 'flex-end', flexDirection: 'column', gap: '10px' }} component="div" disablePadding>
                                                            <BannerTable rows={rows} currentIndex={currentSection} handleAddBanner={handleAddBanner} />
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
                <NewBanner reload={loadBanners} currentSection={currentSection} close={() => setModal(false)} />
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
