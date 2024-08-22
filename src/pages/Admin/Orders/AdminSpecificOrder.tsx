import React, { useEffect, useState } from 'react'
import OrderSpecificCard from 'components/OrderSpecificCard';
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { Order, StatusKey } from 'configs/types';
import { EPS, provider } from 'configs/axios';
import { defaultOrder, mapStatusToStringForAlertMessage } from 'configs/constants';
import { useToasts } from 'react-toast-notifications';
import { MESSAGES } from 'utils/messages';
import Backdrop from 'components/Backdrop';
import CommonAlertDialog from 'components/CommonAlertDialog';

const AdminSpecificOrder = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState<Order>(defaultOrder);
    const { addToast } = useToasts();
    const [alertDialog, setAlertDialog] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(0);
    const navigate = useNavigate();

    async function loadOrder() {
        try {
            const { data: { order } } = await provider.get(`${EPS.SPEC_ORDER}/${orderId}`);
            setOrder(order);
        } catch (err) {
            console.log(err);
        }
    }
    function handleStatusUpdateTrigger(status: number) {
        setStatus(status);
        setAlertDialog(true);
    }

    async function statusUpdateHandler() {
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
            setAlertDialog(false);
            navigate(-1);
        } catch (err) {
            addToast(MESSAGES.EDIT_FAILURE('status'), {
                appearance: 'error',
                autoDismiss: true,
            });
            setAlertDialog(false);
            console.log(err);
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        loadOrder();
    }, [])
    return (
        <Container>
            <OrderSpecificCard func={handleStatusUpdateTrigger} order={order} />
            {alertDialog && <Backdrop close={() => setAlertDialog(false)}>
                <CommonAlertDialog
                    header={`Are you sure to ${mapStatusToStringForAlertMessage[status].toLowerCase()} the order?`}
                    actionBtn={mapStatusToStringForAlertMessage[status]}
                    open={alertDialog}
                    setOpen={setAlertDialog}
                    exec={statusUpdateHandler}
                />
            </Backdrop>}
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