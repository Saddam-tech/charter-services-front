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
    head: string;
    text: string;
    urlToS3: string;
    active: boolean;
    type: string;
    uuid: string;
}

const Service = ({ head, text, urlToS3, type, uuid }: Data) => {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <Container type={type} onClick={() => navigate(`${type}/services/${uuid}`)}>
                <Image src={urlToS3} alt="serviceImage" />
                <Header>{head}</Header>
                <Content>{text?.length > 100 ? text.slice(0, 100) : text} <Link style={{ textDecoration: "none" }} to={`${type}/services/${uuid}`}>...See More</Link></Content>
            </Container>
        </ThemeProvider>
    )
}

export default Service

const Container = styled.section<{ type: string }>`
display: flex;
align-items: flex-start;
justify-content: flex-start;
flex-direction: column;
padding: 10px;
background-color: #fff;
color: #000;
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
    object-fit: fit;
    overflow: hidden;
`

const Header = styled.h1`
    font-size: 18px;
    font-weight: 800;
`

const Content = styled.p`
    font-size: 14px;
`
