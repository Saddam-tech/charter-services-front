import { Button } from "@mui/material";
import styled from "styled-components"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import Backdrop from "components/Backdrop";
import { EPS, provider } from "configs/axios";
import NewFleet from "components/NewFleet";
import SpecFleet from "components/SpecFleet";

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

const Fleet = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [fleet, setFleet] = useState<Data[]>();

    async function loadFleet() {
        try {
            const { data: { response } } = await provider.get(EPS.FLEET);
            setFleet(response);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        loadFleet();
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <HeaderWrap>
                    <h2>Fleet Management</h2>
                    <Button
                        onClick={() => setModal(true)}
                        sx={{ maxWidth: '200px', backgroundColor: '#c69536', color: '#ffffff' }}
                        variant="contained"
                    >
                        New Fleet
                    </Button>
                </HeaderWrap>
                <BlogsWrap>
                    {fleet?.map((el, index) => (
                        <SpecFleet {...el} key={index} type="/admin" />
                    ))}
                </BlogsWrap>
            </Container>
            {modal && <Backdrop close={() => setModal(false)}>
                <NewFleet reload={loadFleet} close={() => setModal(false)} />
            </Backdrop>}
        </ThemeProvider>
    )
}

export default Fleet

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