import { useEffect, useState } from "react";
import { styled } from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';

const Iframe = () => {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setLoading(false);
        }, 3500)
    }, [])
    return (
        <Container loader={loading}>
            <h2>Online Reservation</h2>
            <CircularProgress className="loader" color="inherit" />
            <iframe
                className="frame"
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

type Iprops = {
    loader: boolean;
}

const Container = styled.section<Iprops>`
display: flex;
align-items: center;
justify-content: flex-start;
flex-direction: column;
gap: ${({ loader }) => loader ? "250px" : "30px"};
background-color: #000000;
padding: 40px 150px;
height: 100vh;

.loader {
    display: ${({ loader }) => loader ? "block" : "none"};
}
.frame {
    display: ${({ loader }) => loader ? "none" : "block"};
}

@media screen and (max-width: 728px) {
    padding: 40px 20px;
}

h2 {
    color: #c69536;
}
`;