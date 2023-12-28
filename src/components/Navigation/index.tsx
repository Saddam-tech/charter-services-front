import styled from "styled-components"
import { navigation } from "../../data/index";
import SwipeableTemporaryDrawer from "components/SwipeableTemporaryDrawer";
import { useNavigate } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useState } from "react";
interface ContainerProps {
    active: boolean;
}
const Navigation = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState<boolean>(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    function handleNavigationClick(path: string, index: number | null) {
        navigate(path);
        setActiveIndex(index);
    }
    return (
        <Container active={active}>
            <div onClick={() => handleNavigationClick("/", null)} className="logo-wrap">
                <img src={require('assets/schs-mainlogo.png')} alt="" className="main-logo" />
                <div className="inner-holder">
                    <h1 className="service-name">Summit Charter Services</h1>
                    <p>Charter Bus and Executive Black Car Services</p>
                </div>
            </div>
            <ul>
                {navigation.map((el, i) => {
                    return i === 6 ? <a key={i} href={`tel:${el.route}`}><LocalPhoneIcon />{el.route}</a> : <li className={activeIndex === i ? 'active' : ''} onMouseEnter={() => i === 7 && setActive(true)} onMouseLeave={() => setActive(false)} onClick={() => handleNavigationClick(el.route, i)} key={i}>{el.page}</li>
                })}
                <ul onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} className="hover-group">
                    {
                        [{ name: 'Instant Quote', path: 'i-quote' }, { name: "Custom Quote", path: 'c-quote' }].map((el, i) => {
                            return (<li onClick={() => navigate(el.path)} key={i}>{el.name}</li>)
                        })
                    }
                </ul>
            </ul>
            <SwipeableTemporaryDrawer />
        </Container>
    )
}

export default Navigation

const Container = styled.section<ContainerProps>`
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
                color: #c69536;
                @media screen and (max-width: 728px) {
                    font-size: 12px;
                }
            }
            p {
                margin: 0;
                color: #7c5e26;
                @media screen and (max-width: 728px) {
                    font-size: 9px;
                }
            }
        }

        img {
            max-width: 110px;
            width: auto;
            @media screen and (max-width: 728px) {
                max-width: 80px;
            }
        }
    }
    ul {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 35px;
        position: relative;
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
        li:hover {
            color: #767676
        }
        .active {
            color: #767676;
        }
        a, li:nth-child(8) {
            background-color: #c6963685;
            color: #000000;
            border: 1px solid #c6963685;
            padding: 10px;
            border-radius: 5px;
            text-decoration: none;
        }
        .hover-group {
            display: flex;
            opacity: ${({ active }) => active ? 1 : 0};
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: absolute;
            top: 37px;
            right: 0;
            padding-top: 20px;
            gap: 10px;
            transition: 0.3s ease-in-out;

            li {
                width: 150px;
                background-color: #c6963685;
                color: #000000;
                border: 1px solid #c6963685;
                padding: 10px;
                border-radius: 5px;
                text-decoration: none;
            }
        }
    }
`