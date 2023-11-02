import Carousel from "components/Carousel"
import styled from "styled-components"
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

const Index = () => {
    return (
        <Container>
            <Carousel />
            {/* covid measures belt start */}
            <section className="belt">
                <div className="outer-wrap">
                    <AutoAwesomeOutlinedIcon sx={{ fontSize: 40, color: '#a3a3a3' }} />
                    <div className="textarea">
                        <p>COVID - 19 MEASURES</p>
                        <p>Profesionally cleaned each time for your safety</p>
                    </div>
                </div>
                <p className="watch-safety-video">
                    Watch our COVID-19 Safety Video
                </p>
            </section>
            {/* covid measures belt end */}

            {/* list */}
            <section className="list">
                <ul>
                    <li>Corporate Solutions</li>
                    <li>Charters & Tours</li>
                    <li>Event Logistics</li>
                    <li>Custom Solutions</li>
                </ul>
            </section>
            {/* list */}

            {/* text */}
            <h1>
                With over 34 years of experience, our dedicated account managers, advanced technology, and luxury vehicle fleets ensure you’ll have peace of mind for all your transportation and event needs.
            </h1>
            {/* text */}
        </Container>
    )
}

export default Index

const Container = styled.section`
display: flex;
align-items: flex-start;
justify-content: flex-start;
flex-direction: column;
background-color: #000000;

.belt {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 200px;
    background-color: #272727;
    width: 100%;
    padding: 15px;
    @media screen and (max-width: 728px) {
        display: none;
    }
    .outer-wrap {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap: 20px;
        .textarea {
            p {
                margin: 0;
                padding: 0;
                color: #a3a3a3;
            }
        }
    }
    .watch-safety-video     {
        background-color: #18272A;
        color: #099982;
        border: 1px solid #099982;
        padding: 10px;
        border-radius: 5px;
        margin: 0;
    }
}

.list {
    width: 100%;
    margin: 140px 0;
    ul {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 40px;

        li {
            list-style-type: none;
            text-decoration: none;
            border-right: 1px solid #a3a3a3;
            padding: 10px 30px 10px 0;
            color: #a3a3a3;
        }
        li:last-child {
            border: none;
        }
    }
}
h1 {
    color: #ffffff;
    /* max-width: 900px; */
    width: 100%;
    text-align: center;
}
`