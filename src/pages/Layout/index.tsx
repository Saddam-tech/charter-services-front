import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import styled from 'styled-components';


const Layout = () => {
    const location = useLocation
    const [isTransparent, setIsTransparent] = useState<boolean>(true);

    function handleScroll() {
        if (window.scrollY === 0) {
            setIsTransparent(true)
        } else {
            setIsTransparent(false)
        }

    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <Container>
            <Navigation />
            <Outlet />
        </Container>
    )
}

export default Layout

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  position: relative;
`
