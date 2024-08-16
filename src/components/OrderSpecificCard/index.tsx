import Chip from '@mui/joy/Chip';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import styled from 'styled-components';
import { Order, StatusKey } from 'configs/types';
import dayjs from 'dayjs';
import { mapStatusToString } from 'configs/constants';

export default function OrderSpecificCard({ order }: { order: Order }) {
    const {
        type,
        pickup_location,
        dropoff_location,
        email,
        phonenumber,
        firstname,
        lastname,
        car_type,
        n_ppl,
    } = order;
    const rowsToShow = {
        // date,
        // status,
        // time,
        // created_at,
        type,
        pickup_location,
        dropoff_location,
        email,
        phonenumber,
        firstname,
        lastname,
        car_type,
        n_ppl,
    }
    return (
        <Card
            sx={{
                maxWidth: '100%',
                boxShadow: 'lg',
            }}
        >
            <CardContent sx={{ alignItems: 'start', textAlign: 'start' }}>
                <Chip
                    size="sm"
                    variant="soft"
                    color="primary"
                    sx={{
                        mt: -1,
                        mb: 1,
                        border: '3px solid',
                        borderColor: 'background.surface',
                    }}
                >
                    {mapStatusToString[order.status as StatusKey]}
                </Chip>
                <Typography level="title-lg">ORDER: {order.orderid.slice(0, 8).toUpperCase()}</Typography>
                {Object.entries(rowsToShow).map(([key, value], index) => (
                    <Section key={index}>
                        <Typography level="title-lg">{key}:</Typography>
                        <Typography level="body-lg" >
                            {value}
                        </Typography>
                    </Section>
                ))}
                <Section>
                    <Typography level="title-lg">Created At:</Typography>
                    <Typography level="body-lg" sx={{ maxWidth: '24ch' }}>
                        {dayjs(order.created_at).format("YYYY-MM-DD hh:mm:ss a")}
                    </Typography>
                </Section>
                <Section>
                    <Typography level="title-lg">Service Date:</Typography>
                    <Typography level="body-lg" sx={{ maxWidth: '24ch' }}>
                        {dayjs(order.date).format("YYYY-MM-DD")}
                    </Typography>
                </Section>
                <Section>
                    <Typography level="title-lg">Service Time:</Typography>
                    <Typography level="body-lg" sx={{ maxWidth: '24ch' }}>
                        {dayjs(order.date).format("hh:mm:ss a")}
                    </Typography>
                </Section>
                <Section>
                    <Typography level="title-lg">Status:</Typography>
                    <Typography level="body-lg" sx={{ maxWidth: '24ch' }}>
                        {mapStatusToString[order.status as StatusKey]}
                    </Typography>
                </Section>
            </CardContent>
            <CardOverflow sx={{ bgcolor: 'background.level1' }}>
                <CardActions buttonFlex="1">
                    <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
                        <Button>Accept</Button>
                        <Button>Reject</Button>
                        <Button>Delete</Button>
                    </ButtonGroup>
                </CardActions>
            </CardOverflow>
        </Card>
    );
}


const Section = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
`