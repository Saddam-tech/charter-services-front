import { Button } from "@mui/material";
import styled from "styled-components"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import Backdrop from "components/Backdrop";
import { EPS, provider } from "configs/axios";
import Service from "components/Service";
import NewService from "components/NewService";

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
    id: number;
    head: string;
    text: string;
    uuid: string;
    urlToS3: string;
    active: boolean;
}

const Services = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [services, setServices] = useState<Data[]>();

    async function loadServices() {
        try {
            const { data: { response } } = await provider.get(EPS.SERVICES);
            setServices(response);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        loadServices();
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <HeaderWrap>
                    <h2>Services Management</h2>
                    <Button
                        onClick={() => setModal(true)}
                        sx={{ maxWidth: '200px', backgroundColor: '#c69536', color: '#ffffff' }}
                        variant="contained"
                    >
                        New Service
                    </Button>
                </HeaderWrap>
                <BlogsWrap>
                    {services?.map((el, index) => (
                        <Service {...el} key={index} type="/admin" />
                    ))}
                </BlogsWrap>
            </Container>
            {modal && <Backdrop close={() => setModal(false)}>
                <NewService reload={loadServices} close={() => setModal(false)} />
            </Backdrop>}
        </ThemeProvider>
    )
}

export default Services

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding: 0 10px;
  `;

const HeaderWrap = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
`;

const BlogsWrap = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 15px;
    width: 100%;
    margin: 15px 0 30px 0;
`