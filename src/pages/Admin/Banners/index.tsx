import {
    Collapse,
    List,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Button
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BannerTable from 'components/BannerTable';
import NewBanner from '../NewBanner';
import Backdrop from 'components/Backdrop';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { EPS, provider } from 'configs/axios';
import AlertDialog from 'components/AlertDialog';
import { useLocation } from 'react-router-dom';


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

interface Data {
    id?: number;
    sequence?: number;
    active?: boolean;
    head?: string;
    text?: string;
    uuid?: string;
    urlToS3?: string;
}

const Banners = () => {
    const location = useLocation;
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [currentSection, setCurrentSection] = useState<number>(0);
    const [modal, setModal] = useState<boolean>(false);
    const [alertDialog, setAlertDialog] = useState<boolean>(false);
    const [deleteItemUuid, setDeleteItemUUID] = useState<string>('');
    const [rows, setRows] = useState<Data[]>([]);

    async function loadBanners(section_id: number) {
        try {
            const { data: { response } } = await provider.get(`${EPS.BANNERS}?section=${section_id}`);
            setRows(response);
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
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Container>
            <HeaderWrap>
                <h2>Banner Management</h2>
            </HeaderWrap>
            <ThemeProvider theme={theme}>
                <Paper sx={{ width: '100%', overflow: 'hidden', margin: '30px 0', overflowY: 'scroll' }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableBody>
                                {new Array(3).fill('*').map((row, i) => {
                                    const isSelected = i === selectedId && !isCollapsed;
                                    let currentSection = i + 1;
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                            <TableCell
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    width: '100%',
                                                    cursor: 'pointer',
                                                }}
                                                key={i}
                                            >
                                                <ListItemButton onClick={() => handleItemClick(i)}>
                                                    Section {currentSection}
                                                    {isSelected ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                                <Collapse in={isSelected} timeout="auto" unmountOnExit>
                                                    <List
                                                        sx={{
                                                            display: 'flex',
                                                            alignItem: 'flex-end',
                                                            justifyContent: 'flex-end',
                                                            flexDirection: 'column',
                                                            gap: '10px',
                                                        }}
                                                        component="div"
                                                        disablePadding
                                                    >
                                                        <BannerTable
                                                            rows={rows}
                                                            currentIndex={currentSection}
                                                            handleAddBanner={handleAddBanner}
                                                            setDeleteItemUUID={setDeleteItemUUID}
                                                            setAlertDialog={setAlertDialog}
                                                            setRows={setRows}
                                                        />
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
            {modal && (
                <Backdrop close={() => setModal(false)}>
                    <NewBanner reload={loadBanners} currentSection={currentSection} close={() => setModal(false)} />
                </Backdrop>
            )}
            {alertDialog && (
                <AlertDialog
                    section_id={currentSection}
                    loadBanners={loadBanners}
                    itemuuid={deleteItemUuid}
                    open={alertDialog}
                    setOpen={setAlertDialog}
                />
            )}
        </Container>
    );
};

export default Banners;

const Container = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100vh;
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
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
  `;
