import React, { useEffect, useState } from 'react'
import OrderSpecificCard from 'components/OrderSpecificCard';
import { useParams } from "react-router-dom";
import styled from "styled-components"
import { Order } from 'configs/types';
import { EPS, provider } from 'configs/axios';
import { defaultOrder } from 'configs/constants';

const AdminSpecificOrder = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState<Order>(defaultOrder);

    async function loadOrder() {
        try {
            const { data: { order } } = await provider.get(`${EPS.SPEC_ORDER}/${orderId}`);
            setOrder(order);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        loadOrder();
    }, [])
    return (
        <Container>
            <OrderSpecificCard order={order} />
        </Container>
    )
}

export default AdminSpecificOrder

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`