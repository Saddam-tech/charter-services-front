import React, { useEffect, useState } from 'react'
import OrderSpecificCard from 'components/OrderSpecificCard';
import { useParams } from "react-router-dom";
import styled from "styled-components"
import { Order, StatusKey } from 'configs/types';
import { EPS, provider } from 'configs/axios';
import { defaultOrder } from 'configs/constants';
import { useToasts } from 'react-toast-notifications';
import { MESSAGES } from 'utils/messages';

const AdminSpecificOrder = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState<Order>(defaultOrder);
    const { addToast } = useToasts();

    async function loadOrder() {
        try {
            const { data: { order } } = await provider.get(`${EPS.SPEC_ORDER}/${orderId}`);
            setOrder(order);
        } catch (err) {
            console.log(err);
        }
    }
    async function statusUpdateHandler(status: number) {
        try {
            const body = { status, orderid: orderId };
            await provider.put(EPS.STATUS_UPDATE, body)
            let statusMessage: Record<StatusKey, string> = {
                0: "",
                1: MESSAGES.ORDER_STATUS_1,
                2: MESSAGES.ORDER_STATUS_2
            }
            addToast(statusMessage[status as StatusKey], {
                appearance: 'success',
                autoDismiss: true,
            });
        } catch (err) {
            addToast(MESSAGES.EDIT_FAILURE('status'), {
                appearance: 'error',
                autoDismiss: true,
            });
            console.log(err);
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
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