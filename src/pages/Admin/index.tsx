import { useEffect } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Navigation from "./Navigation";
import Header from "./Header";

const Admin = () => {
    const location = useLocation;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <Container>
            <Header />
            <InnerWrap>
                <Navigation />
                <Outlet />
            </InnerWrap>
        </Container>
    )
}

export default Admin

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: linear-gradient(to right,  #fffacd, #ffb6c1);
`

const InnerWrap = styled.section`
    display:flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;
`