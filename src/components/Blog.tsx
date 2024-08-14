import styled from "styled-components"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Switch } from '@mui/material';

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

const Blog = ({ type, header, content, imgURL }: { type: string; header: string; content: string; imgURL: string; }) => {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Image src={imgURL} alt="blogImage" />
                <Header>{header}</Header>
                <Content>{content}</Content>
                {type !== 'main' && <Wrap>
                    <Switch edge="end" disabled checked={true} />
                    <Button variant="contained" color="primary">Edit</Button>
                    <Button variant="contained" color="primary">Delete</Button>
                </Wrap>}
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
background-color: #ffffff;
max-width: 500px;
gap: 10px;
border-radius: 5px;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 5px;
`

const Header = styled.h1`
    font-size: 18px;
    font-weight: 800;
`

const Content = styled.p`
font-size: 14px;
`

const Wrap = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    gap: 10px;
` 