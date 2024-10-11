import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import styled from "styled-components";
import Navigation from "./Navigation";
import Header from "./Header";

interface IProps {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Admin = ({ token, setToken }: IProps) => {
    const location = useLocation;
    const [mode, setMode] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 728px)');
        setIsMobile(mediaQuery.matches);
    }, [])
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <Container mode={mode}>
            <Header mode={mode} setMode={setMode} />
            <InnerWrap>
                {!isMobile && <Navigation />}
                <Outlet />
            </InnerWrap>
        </Container>
    )
}

export default Admin

const Container = styled.section<{ mode: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    background-image: ${({ mode }) => mode ? 'linear-gradient(to right,  #fff6a3, #ffb6e3);' : 'linear-gradient(to right,  #000000, #825772);'};
    color: ${({ mode }) => mode ? '#000' : '#fff'};
`

const InnerWrap = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`