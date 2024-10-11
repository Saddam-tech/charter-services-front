import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import profileBackground from "assets/services-background.webp"
import { socials } from 'data';
import ServicesBlog from 'components/ServicesBlog';
import QuoteInput from 'components/QuoteInput';
import { Fade } from "react-awesome-reveal";
import { useLocation } from 'react-router-dom';
import { EPS, provider } from 'configs/axios';
import FleetCard from 'components/FleetCard';
const socialsConf = { fontSize: 40, color: "#ffffff" };
export const blogs = [{ h1: 'Exquisite Fleet of Luxury Buses', text: 'Our fleet boasts a collection of meticulously maintained luxury buses designed for comfort, elegance, and maximum enjoyment. From plush seating to cutting-edge amenities, we redefine the standards of luxury travel.', img: "fleet-0.webp" },
{ h1: 'Spacious Interiors for Group Comfort', text: 'With ample seating capacity, our buses provide a spacious and comfortable environment for your entire group. Enjoy the journey together in style, whether you`re planning a corporate outing or a family celebration.', img: "fleet-1.webp" },
{ h1: 'Professional Chauffeurs, Seamless Service', text: 'Our experienced and professional chauffeurs are dedicated to ensuring a smooth and enjoyable journey. Sit back, relax, and let our skilled drivers navigate the roads while you focus on creating memories.', img: "fleet-1.webp" },

]
interface Data {
    model_name: string;
    brand_name: string;
    description: string;
    seats: number;
    uuid: string;
    active: number;
    type: string;
    urlToS3: string;
}

const Fleet = () => {
    const [fleet, setFleet] = useState<Data[]>();
    const location = useLocation;
    async function loadFleet() {
        try {
            const { data: { response } } = await provider.get(EPS.FLEET);
            const filtered = response.filter((el: Data) => el.active == 1);
            setFleet(filtered);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        loadFleet();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <Container>
            <Fade cascade damping={0.1}>
                {/* profile-wrap */}
                <section className="profile-wrap">
                    <div className="backdrop"></div>
                    <div className="text-wrap">
                        <h1>OUR Fleet</h1>
                        <p>Luxury Bus Charters: Elevate Your Events with Unparalleled Comfort and Style. <br />
                            🌟 Welcome to Summit Charter Fleet Luxury Bus Charters – Where Every Journey Is a Grand Experience!
                            Transform your events into unforgettable experiences with our opulent service of luxury buses. Whether it's a corporate gathering, wedding, sports event, or any special occasion, Summit Charter Fleet is your premier choice for unparalleled comfort and style.
                        </p>
                    </div>
                    <div className="social-media-list">
                        {socials.map((el, i) => (
                            <a key={i} target="_blank" rel="noreferrer" href={el.path}>
                                <el.icon sx={socialsConf} />
                            </a>
                        ))}
                    </div>
                </section>
                {/* profile-wrap */}

                {/* strip map */}
                <section className="strip-map">
                    <ul>
                        <li>Corporate Fleet</li>
                        <li>Charters & Tours</li>
                        <li>Events & Entertainment</li>
                        <li>Custom solutions</li>
                    </ul>
                </section>
                {/* strip map */}

                {/* fleet-holder */}
                <section className="blogs-holder">
                    {fleet?.map((el, i) => (
                        <FleetCard key={i} {...el} />
                    ))}
                </section>
                {/* fleet-holder */}
            </Fade>
        </Container>
    )
}

export default Fleet

const Container = styled.section`
background-color: #000000;
height: 100%;
.profile-wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    background-image: url(${profileBackground});
    background-size: cover;
    background-position: center;
    position: relative;
    height: 400px;

.backdrop {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.8);
        z-index: 1;
    }
.text-wrap {
    padding: 10px;
    width: 100%;
    max-width: 600px;
    color: #ffffff;
    z-index: 2;
    text-align: center;

    h1 {
        font-weight: 200;
    }
}
.social-media-list {
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
        max-width: 800px;
        width: 100%;
        padding: 0 10px;
        z-index: 2;
    }
}
.strip-map {
    display: flex;
    align-items:center;
    justify-content: center;
    background: linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.1) 48%, rgba(0,0,0,0.1) 100%);
    width: 100%;
    padding: 30px 20px;
    ul {
        display: flex;
        align-items: center;
        justify-content: center;
        /* gap: 20px; */
        width: 100%;
        margin: 0;
        padding: 0;
        @media screen and (max-width: 728px) {
        flex-direction: column;
        }
        li {
            list-style-type: none;
            color: #ffffff;
            font-size: 16px;
            cursor: pointer;
            padding: 10px 20px;
            border-right: 1px solid #3c3c3c;
            @media screen and (max-width: 728px) {
            border: none;
        }
        }
        li:last-child {
            border: none;
        }
        li:hover {
            color: #767676
        }
    }
}

.blogs-holder {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin-top: 50px;
    flex-direction: column;
    gap: 20px;
}   
`;