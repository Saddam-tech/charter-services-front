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
    height: 85px;

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
            background-color: #41727c;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #4fb6cb;
            color: #00d5ff;
        }
    }
`