import QuoteInput from "components/QuoteInput";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { styled } from "styled-components";

const CustomQuote = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <Container>
            <Fade damping={0.1}>
                <QuoteInput />
            </Fade>
        </Container>
    );
};

export default CustomQuote;

const Container = styled.section`
display: flex;
align-items: flex-start;
justify-content: center;
background-color: #000000;
height: 100vh;
padding-top: 100px;
`;