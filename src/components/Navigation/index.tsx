import styled from "styled-components"
import { navigation } from "../../data/index";
import SwipeableTemporaryDrawer from "components/SwipeableTemporaryDrawer";
import { useNavigate } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useState } from "react";
import ServicesDropdown from "components/ServicesDropdown";
interface ContainerProps {
    services: boolean;
    quote: boolean;
}
interface active {
    active: ContainerProps;
}
const services = [
    { h1: "Corporate Solutions", img: 'services-0.webp', paths: ['First-Mile & Last-Mile', 'On-Demand', 'Reservations', 'Commuter Shuttles'] },
    { h1: "Charters", img: 'services-1.webp', paths: ['Airport Transfers', 'Corporate Tours', 'Ski Trips', 'Wine Country Tours'] },
    { h1: "Custom Solutions", img: 'services-2.webp', paths: ['Airport Transfers', 'Corporate Tours', 'Ski Trips', 'Wine Country Tours'] },
    { h1: "Corporate Solutions", img: 'services-3.webp', paths: ['First-Mile & Last-Mile', 'On-Demand', 'Reservations', 'Commuter Shuttles'] }
];
const Navigation = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState<ContainerProps>({ services: false, quote: false })
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    function handleNavigationClick(path: string, index: number | null) {
        navigate(path);
        setActiveIndex(index);
    }
    function handleNavigationHover(index: number, status: boolean) {
        switch (index) {
            case 0:
                setActive((prev) => ({ ...prev, services: status }));
                break;
            case 7:
                setActive((prev) => ({ ...prev, quote: status }));
                break;
            default:
                return;
        }
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
                    return i === 4 ? <a key={i} href={`tel:${el.route}`}><LocalPhoneIcon />{el.route}</a> : <li className={activeIndex === i ? 'active' : ''} onMouseEnter={() => handleNavigationHover(i, true)} onMouseLeave={() => handleNavigationHover(i, false)} onClick={() => handleNavigationClick(el.route, i)} key={i}>{el.page}</li>
                })}
                {active.services && (
                    <div onMouseEnter={() => handleNavigationHover(0, true)} onMouseLeave={() => handleNavigationHover(0, false)} className="dropdown">
                        {services.map((el, i) => (
                            <ServicesDropdown key={i} h1={el.h1} img={el.img} arr={el.paths} />
                        ))}
                    </div>
                )}
                {/* <ul onMouseEnter={() => handleNavigationHover(7, true)} onMouseLeave={() => handleNavigationHover(7, false)} className="hover-group">
                    {
                        [{ name: 'Instant Quote', path: 'i-quote' }, { name: "Custom Quote", path: 'c-quote' }].map((el, i) => {
                            return (<li onClick={() => navigate(el.path)} key={i}>{el.name}</li>)
                        })
                    }
                </ul> */}
            </ul>
            <SwipeableTemporaryDrawer />
        </Container>
    )
}

export default Navigation

const Container = styled.section<active>`
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
        .dropdown {
            position: absolute;
            left: -150px;
            top: 60px;
            background-color: #0000008e;
            padding: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            border-radius: 20px;
            overflow: hidden;
        }
        li {
            display: flex;
            align-items: center;
            justify-content: center;
            list-style-type: none;
            text-decoration: none;
            color: #ffffff;
            font-size:  17px;
            cursor: pointer;
            height: 60px;
        }
        li:hover {
            color: #767676
        }
        li:nth-of-type(5) {
            height: unset;
        }
        .active {
            color: #767676;
        }
        a, li:nth-child(6) {
            background-color: #c6963685;
            color: #000000;
            border: 1px solid #c6963685;
            padding: 10px;
            border-radius: 5px;
            text-decoration: none;
        }
        .hover-group {
            display: flex;
            opacity: ${({ active }) => active.quote ? 1 : 0};
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: absolute;
            top: 45px;
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
                height: unset;
            }
        }
    }
`