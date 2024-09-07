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
    type: string;
    uuid: string;
}

const Blog = ({ head, text, urlToS3, type, uuid }: Data) => {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <Container onClick={() => navigate(`${type}/blogs/${uuid}`)}>
                <Image src={urlToS3} alt="blogImage" />
                <Header>{head}</Header>
                <Content>{text?.length > 100 ? text.slice(0, 100) : text} <Link style={{ textDecoration: "none" }} to={`${type}/blogs/${uuid}`}>...Read More</Link></Content>
            </Container>
        </ThemeProvider>
    )
}

export default Blog

const Container = styled.section`
display: flex;
align-items: flex-start;
justify-content: flex-start;
flex-direction: column;
padding: 10px;
background-color: #c6963685;
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
