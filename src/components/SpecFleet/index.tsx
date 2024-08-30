import styled from "styled-components"
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link, useNavigate } from "react-router-dom";

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
    model_name: string;
    brand_name: string;
    description: string;
    seats: number;
    uuid: string;
    active: number;
    type: string;
    urlToS3: string;
}

const SpecFleet = ({ model_name, brand_name, description, seats, uuid, type, active, urlToS3 }: Data) => {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <Container onClick={() => navigate(`${type}/fleet/${uuid}`)}>
                <Image src={urlToS3} alt="fleetImage" />
                <Header>{brand_name} {model_name}</Header>
                <Content>{description?.length > 100 ? description.slice(0, 100) : description} <Link style={{ textDecoration: "none" }} to={`${type}/fleet/${uuid}`}>...Check details</Link></Content>
            </Container>
        </ThemeProvider>
    )
}

export default SpecFleet

const Container = styled.section`
display: flex;
align-items: flex-start;
justify-content: flex-start;
flex-direction: column;
padding: 10px;
background-color: #ffffff;
max-width: 500px;
height: 400px;
gap: 10px;
border-radius: 5px;
padding: 10px;
cursor: pointer;
`

const Image = styled.img`
    max-width: 500px;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    object-fit: cover;
    overflow: hidden;
`

const Header = styled.h1`
    font-size: 18px;
    font-weight: 800;
`

const Content = styled.p`
    font-size: 14px;
`
