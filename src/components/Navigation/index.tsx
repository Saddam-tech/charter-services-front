import styled from "styled-components"
import { navigation } from "../../data/index";

const Navigation = () => {
    return (
        <Container>
            <div className="logo-wrap">
                <img src={require('assets/schs-mainlogo.png')} alt="" className="main-logo" />
                <div className="inner-holder">
                    <h1 className="service-name">Summit Charter Services</h1>
                    <p>Intelligent Transportation</p>
                </div>
            </div>
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

    .logo-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        .inner-holder {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            
            .service-name {
                font-size: 18px;
                font-weight: 800;
                margin: 0;
                color: #7AA64A;
            }
            p {
                margin: 0;
                color: #7aa64a9a;
            }
        }

        img {
            width: 70px;
        }
    }


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