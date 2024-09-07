import styled from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

export interface IFleet {
    model_name: string;
    brand_name: string;
    description: string;
    seats: number;
    uuid: string;
    active: number;
    type: string;
    urlToS3: string;
}

const FleetCard = ({ model_name, brand_name, description, seats, type, urlToS3 }: IFleet) => {
    const navigate = useNavigate()
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <section className="text-holder">
                    <h2>{brand_name} {model_name}</h2>
                    <p>Seats: {seats}</p>
                    <p>Type: {type}</p>
                    <p>Description: {description}</p>
                    <Button
                        onClick={() => navigate('/c-quote')}
                        sx={{ width: '100%', backgroundColor: '#c69536', color: '#000' }}
                        variant="contained"
                    >
                        Book
                    </Button>
                </section>
                <img src={urlToS3} alt="service-img" />
            </Container>
        </ThemeProvider>
    )
}

export default FleetCard

const Container = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    margin: 50px 0;

    .text-holder {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap: 10px;
        flex-direction: column;
        max-width: 600px;
        width: 100%;
        color: #ffffff;
    }
    img {
        width: 100%;
        max-width: 500px;
    }
`;

