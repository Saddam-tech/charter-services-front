import { Collapse, List, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BannerTable from 'components/BannerTable';


const sections = [
    { id: 0, img: '', order: 1, active: 1, url: '' },
    { id: 1, img: '', order: 2, active: 1, url: '' },
    { id: 2, img: '', order: 3, active: 1, url: '' },
    { id: 3, img: '', order: 4, active: 1, url: '' },
];

const Banners = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

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

            <Paper sx={{ width: '100%', overflow: 'hidden', margin: '30px 0' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableBody>
                            {new Array(5).fill('*')
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
                                                    <List component="div" disablePadding>
                                                        <BannerTable />
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
