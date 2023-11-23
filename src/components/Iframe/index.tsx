import { useEffect } from "react";
import { styled } from "styled-components";

const Iframe = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <Container>
            <h2>Online Reservation</h2>
            <iframe
                title="Online Reservations"
                src="https://book.mylimobiz.com/v4/prestigerider?data-ores-widget=quickres"
                width="100%"
                height="1000px"
                frameBorder="0"
            ></iframe>
            <script type="text/javascript" src="https://book.mylimobiz.com/v4/widgets/widget-loader.js"></script>
        </Container>
    );
};

export default Iframe;


const Container = styled.section`
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: column;
gap: 30px;
background-color: #000000;
padding: 40px 150px;

@media screen and (max-width: 728px) {
    padding: 40px 20px;
}

h2 {
    color: #7AA64A;
}
`;