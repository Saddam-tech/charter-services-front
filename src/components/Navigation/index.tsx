import styled from "styled-components"
import { navigation } from "../../data/index";

const Navigation = () => {
    return (
        <Container>
            <img src="" alt="" className="main-logo" />
            <ul>
                {navigation.map((el, i) => (
                    <li key={i}>{el}</li>
                ))}
            </ul>
        </Container>
    )
}

export default Navigation

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #000000;
    height: 105px;
    z-index: 9;
    width: 100%;
    @media screen and (max-width: 728px) {
        display: none;
    }
    ul {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 35px;

        li {
            list-style-type: none;
            text-decoration: none;
            color: #ffffff;
            font-size:  17px;
            cursor: pointer;
        }
        li:last-child {
            background-color: #18272A;
            color: #099982;
            border: 1px solid #099982;
            padding: 10px;
            border-radius: 5px;
        }
    }
`