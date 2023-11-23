import styled from "styled-components"
import { navigation } from "../../data/index";
import SwipeableTemporaryDrawer from "components/SwipeableTemporaryDrawer";
import { useNavigate } from 'react-router-dom';
const Navigation = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <div onClick={() => navigate("/")} className="logo-wrap">
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
            <SwipeableTemporaryDrawer />
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
    padding: 10px;
    @media screen and (max-width: 728px) {
        height: 70px;
        justify-content: space-between;
    }
    .burger-icon {
        @media screen and (min-width: 728px) {
            display: none;
        }
    }
    .logo-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        cursor: pointer;
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
                @media screen and (max-width: 728px) {
                    font-size: 12px;
                }
            }
            p {
                margin: 0;
                color: #7aa64a9a;
                @media screen and (max-width: 728px) {
                    font-size: 9px;
                }
            }
        }

        img {
            max-width: 60px;
            width: auto;
            @media screen and (max-width: 728px) {
                max-width: 30px;
            }
        }
    }
    ul {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 35px;
        @media screen and (max-width: 728px) {
            display: none;
        }
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