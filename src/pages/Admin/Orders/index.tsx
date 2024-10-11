import CustomTable from 'components/CustomTable'
import styled from 'styled-components'
import { useParams, useLocation } from "react-router-dom";
import { EPS, provider } from 'configs/axios';
import { useEffect, useState } from 'react';
import { Order, PathKey } from 'configs/types';
import { mapPathToStatus } from 'configs/constants';
import ReplayIcon from '@mui/icons-material/Replay';



const Orders = () => {
    const location = useLocation;
    const { path } = useParams();
    const [orders, setOrders] = useState<Order[]>([]);

    async function loadOrders(status: number) {
        try {
            const { data: { orders } } = await provider.get(`${EPS.ORDERS}?status=${status}`);
            setOrders(orders);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadOrders(mapPathToStatus[path as PathKey]);
    }, [path])
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <Container>
            <HeaderWrap>
                <Row>
                    <h2>{path && path[0].toUpperCase() + path?.slice(1)} Orders</h2>
                    <ReplayIcon onClick={() => loadOrders(mapPathToStatus[path as PathKey])} sx={{ cursor: 'pointer' }} />
                </Row>
                <TableWrap>
                    <CustomTable orders={orders} />
                </TableWrap>
            </HeaderWrap>
        </Container>
    )
}

export default Orders

const Container = styled.section`
    display: flex;
    align-items: fle-start;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;
    padding: 0 10px;
`

const HeaderWrap = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    flex-direction: column;
    gap: 20px;
`

const Row = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

const TableWrap = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 80em;
    width: 100%;
    padding: 0 30px 0 0;
`