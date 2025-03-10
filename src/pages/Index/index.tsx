import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "components/Carousel"
import styled from "styled-components"
import footerImg from "assets/footer.webp";
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Fade } from "react-awesome-reveal";
import { socials } from "data";
import { EPS, provider } from "configs/axios";
import { defaultAdmin } from 'configs/constants';
import { ProfileCreds } from 'configs/types';

const socialsConf = { fontSize: 20, color: "#ffffff" };

export interface BannerInfo {
    head?: string;
    body?: string;
    url: string;
    section: string;
    order: string;
    active: number;
}

const Index = () => {
    const navigate = useNavigate();
    const [banners, setBanners] = useState<BannerInfo[]>([]);
    const [adminInfo, setAdminInfo] = useState<ProfileCreds>(defaultAdmin);

    async function loadBanners() {
        try {
            const { data: { response } } = await provider.get(EPS.BANNERS);
            const arr: BannerInfo[] = [];
            for (let el of response) {
                arr.push({
                    head: el.head,
                    body: el.text,
                    url: el.urlToS3,
                    section: el.section,
                    order: el.sequence,
                    active: el.active
                });
            }
            setBanners(arr.filter(el => el.active === 1));
        } catch (err) {
            console.log(err);
        }
    }
    async function loadProfile() {
        try {
            const { data: { admin } } = await provider.get(EPS.ADMIN_INFO);
            setAdminInfo(admin);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadBanners();
        loadProfile();
        window.scrollTo(0, 0);
    }, [])
    return (
        <Container>
            <Carousel banners={banners.filter(el => el.section === '1').sort((a, b) => parseInt(a.order) - parseInt(b.order))} />

            {/* input fields */}
            {/* <QuoteInput /> */}
            {/* input fields */}

            {/* covid measures belt start */}
            <section className="belt">
                <div className="outer-wrap">
                    <AutoAwesomeOutlinedIcon sx={{ fontSize: 40, color: '#a3a3a3' }} />
                    <div className="textarea">
                        {/* <p>COVID - 19 MEASURES</p> */}
                        <p>Profesionally cleaned each time for your safety</p>
                    </div>
                </div>
            </section>
            {/* covid measures belt end */}

            <Fade cascade damping={0.1}>
                {/* charters brag */}
                {banners.filter(el => el.section === '2').sort((a, b) => parseInt(a.order) - parseInt(b.order)).map((_el, i) => (
                    <section key={i} className="charters">
                        <img src={_el.url} alt="charters" />
                        <section className="strip-map">
                            <div className="inner-content">
                                {/* <p>Our World-Class Executive Black Cars ready to give you an unforgettable experience in the San Francisco Bay Area and other states of the US</p> */}
                                {_el.head && <p>{_el.head}</p>}
                                {_el.body && <p>{_el.body}</p>}
                            </div>
                        </section>
                    </section>
                ))}
                {/* charters brag */}

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
                <h1 className="quote">
                    Our drivers are <span>professional</span>, <span>courteous</span>, <span>DOT certified</span>, and <span>well-trained</span> for local and long distance charters. Our company is equipped with  <span>all state and federal required licensing</span> and <span>insurance</span>.
                    Contact us today for more information or to obtain our competitive pricing for your special events.
                </h1>
                {/* text */}

                {/* free quote btn */}
                <section className="btn-wrap">
                    <button onClick={() => navigate('c-quote')}>
                        Get a Free Quote
                    </button>
                </section>
                {/* free quote btn */}


                {/* safety container */}
                <section className="safety-bar">
                    <h4>Safety</h4>
                    <h1>We take your safety seriously</h1>
                    <p>Getting to your destination safely and sound is our number one priority</p>
                    <div className="inner-wrap">
                        <AutoAwesomeOutlinedIcon sx={{ fontSize: 30, color: '#a3a3a3' }} />
                        <p>Periodically cleaned</p>
                    </div>
                </section>
                {/* safety container */}

                {/* image map */}
                <section className="image-map">
                    {banners.filter(el => el.section === "3").sort((a, b) => parseInt(a.order) - parseInt(b.order)).map((_el, i) => (
                        <div key={i} className="wrap">
                            <img loading="lazy" src={_el.url} alt={`cgi-${i}`} />
                            <p>{_el.head}</p>
                        </div>
                    ))}
                </section>
                {/* image map */}

                {/* strip map */}
                <section className="strip-map">
                    <div className="inner-content">
                        <h3>SCHS will get you to any occasion</h3>
                        <ul>
                            <li>Corporate Services</li>
                            <li>Charters</li>
                            <li>Events & Entertainment</li>
                            <li>Custom solutions</li>
                        </ul>
                    </div>
                </section>
                {/* strip map */}

                {/* image map */}
                {/* <section className="image-map">
                {new Array(3).fill('*').map((_, i) => (
                    <div key={i} className="wrap">
                        <img loading="lazy" src={require(`assets/pic-section1-${i}.webp`)} alt={`cgi-${i}`} />
                        <p>{['Airport  Transfers', 'Wine Country  Tours', 'Ski Trips'][i]}</p>
                    </div>
                ))}
            </section> */}
                {/* image map */}


                {/* amenities */}
                {/* <section className="amenities">
                    <div className="wrap0">
                        <h3>AMENITIES</h3>
                        <h1>Equipped with the best</h1>
                        <p>Vehicles are fitted with the state-of-the-art technology to turn your commute into a relaxed one or a productive one</p>
                    </div>
                    <div className="wrap1-box">
                        <div className="icon-wrap">
                            <AirlineSeatReclineExtraIcon sx={utilitiesConf} />
                            <p>Leather seats</p>
                        </div>
                        <div className="icon-wrap">
                            <PowerIcon sx={utilitiesConf} />
                            <p>Power outlets</p>
                        </div>
                        <div className="icon-wrap">
                            <WifiIcon sx={utilitiesConf} />
                            <p>High speed Wifi</p>
                        </div>
                        <div className="icon-wrap">
                            <BathroomIcon sx={utilitiesConf} />
                            <p>Washroom</p>
                        </div>
                    </div>
                </section> */}
                {/* amenities */}

                {/* fleet */}
                <section className="fleet">
                    <h2>Our Fleet</h2>
                    <p>Executive Sedans, Executive SUVs, Mercedes Executive Sprinter, Mercedes Limo Style Sprinter, Executive Shuttles, Executive Motorcoaches</p>
                    <div className="vehicle-images">
                        {new Array(5).fill("*").map((_, i) => (
                            <img key={i} src={require(`assets/vehicle-${i}.webp`)} alt={`vehicle-${i}`} />
                        ))}
                    </div>
                    <button onClick={() => navigate('/fleet')}>View Fleet</button>
                </section>
                {/* fleet */}

                {/* footer */}
                <section className="footer-section">
                    <div className="backdrop"></div>
                    <div className="heading-wrap">
                        <div className="inner-heading-holder-wrap">
                            <h1 className="logo-footer">Summit Charter Services</h1>
                            <p className="sub-heading-footer">Charter Bus and Executive Black Car Services</p>
                        </div>
                        <img src={require('assets/schs-mainlogo.png')} alt="schs-mainlog-white" />
                    </div>
                    <section className="global-wrap">
                        <div className="block">
                            <ul>
                                <li>Services</li>
                                <li>Corporate Services</li>
                                <li>Charters & Tours</li>
                                <li>Events and Logistics</li>
                                <li>School Transportation</li>
                                <li>Custom Solutions</li>
                            </ul>
                        </div>
                        <div className="block">
                            <ul>
                                <li>Vehicles</li>
                                <li>Executive Sedans</li>
                                <li>Executive SUVs</li>
                                <li>Mercedes Executive Sprinter</li>
                                <li>Mercedes Limo Style Sprinter</li>
                                <li>Executive Shuttles</li>
                                <li>Executive Motorcoaches</li>
                            </ul>
                        </div>
                        <div className="block">
                            <a target="blank" href={`mailto:${adminInfo.email}`}>{adminInfo.email}</a>
                            <a href={adminInfo.phone_1}>{adminInfo.phone_1}</a>
                            <a href={adminInfo.phone_2}>{adminInfo.phone_2}</a>
                            <p>{adminInfo.address}</p>
                            <a target="_blank" rel="noreferrer" href={window.location + 'admin'}>
                                Admin Login <OpenInNewIcon />
                            </a>
                            <div className="social-media-list">
                                {socials.map((el, i) => (
                                    <a key={i} target="_blank" rel="noreferrer" href={el.path}>
                                        <el.icon sx={socialsConf} />
                                    </a>
                                ))}
                            </div>
                            <p className="copyright">© {new Date().getFullYear()} Charter and Executive Black Car Services</p>
                        </div>
                    </section>
                </section>
                {/* footer */}
            </Fade>
        </Container>
    )
}

export default Index

const Container = styled.section`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background-color: #000000;
position: relative;

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
        align-items: center;
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
    /* .watch-safety-video     {
        background-color: #18272A;
        color: #099982;
        border: 1px solid #099982;
        padding: 10px;
        border-radius: 5px;
        margin: 0;
        cursor: pointer;
    } */
}

.charters {
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
}

.list {
    width: 100%;
    margin: 120px 0;
    @media screen and (max-width: 728px) {
        display: none;
    }
    ul {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 40px;
        flex-wrap: wrap;

        li {
            list-style-type: none;
            text-decoration: none;
            border-right: 1px solid #a3a3a3;
            padding: 10px 30px 10px 0;
            color: #ffffff;
        }
        li:last-child {
            border: none;
        }
    }
}


.quote {
    color: #ffffff;
    max-width: 1000px;
    width: 100%;
    text-align: center;
    font-size: 30px;
    line-height: 40px;
    padding: 60px 15px;

    span {
        color: #c69536;
    }
}

.btn-wrap {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    max-width: 1000px;
    width: 100%;
    padding: 20px 15px;

    button {
        background-color: #c6963685;
        color: #000000;
        border: 1px solid #c69536;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 800;
    }
}

.safety-bar {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    margin: 60px 0;
    padding: 0 15px;
    h1 {
        padding: 20px 0;
    }
    h4 {
        color: #ffffff;
    }
    .inner-wrap {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        gap: 15px;
        p {
            padding: 0;
            margin: 0;
        }
    }
}

.image-map {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin: 120px 0;
    flex-wrap: wrap;
    gap: 15px;
    .wrap {
        p {
            text-align: center;
            color: #e0e0e0;
            font-size: 21px;
            margin: 10px 0;
        }
        img {
            opacity: 0.5;
            max-width: 580px;
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
    }
    
}

.strip-map {
    display: flex;
    align-items:center;
    justify-content: center;
    background: linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.1) 48%, rgba(0,0,0,0.1) 100%);
    width: 100%;

    .inner-content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: 10px;
        gap: 15px;
        h3 {
            color: #ffffff;
            font-size: 22px;
        }
        ul {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            width: 100%;
            li {
                list-style-type: none;
                color: #ffffff;
                font-size: 12px;
                cursor: pointer;
            }
            li:hover {
                color: #767676
            }
        }
        p {
            width: 100%;
            max-width: 700px;
            text-align: center;
            color: #c69536;
            font-size: 1.2em;
        }
    }
}

.amenities {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    background-color: #ffffff;
    max-width: 780px;
    width: 100%;
    margin: 120px 0;

    .wrap0 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        max-width: 450px;
        width: 100%;
        padding: 20px;
        h1  {
            color: #000000;
        }
        
        h3 {
            width: 100%;
            font-size: 14px;
            font-weight: 700;
            color: #3FD5BA;
        }
    }


    .wrap1-box {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 50px;
        max-width: 350px;
        width: 100%;
        padding: 20px;
        background-color: #131313;
        .icon-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            p {
                font-size: 12px;
                color: #ffffff;
            }
        }
    }
}
.fleet {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    margin: 100px 0;
    max-width: 1200px;
    width: 100%;

    h2 {
        color: #ececec;
        font-size: 28px;
    }
    p {
        text-align: center;
        color: #a1a1a1;
        margin: 0 0 45px 0;
        max-width: 200px;
        width: 100%;
    }

    .vehicle-images {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
        width: 100%;
        img {
            width: 200px;
            object-fit: cover;
        }
    }

    button {
        background-color: #c6963685;
        color: #000000;
        border: 1px solid #c69536;
        padding: 10px;
        margin: 40px 0;
        border-radius: 5px;
        cursor: pointer;
    }
}

.footer-section {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    background-image: url(${footerImg});
    background-size: cover;
    background-position: center; 
    padding: 150px;
    position: relative;

    @media screen and (max-width: 728px) {
        padding: 80px;
    }
    .backdrop {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.8);
        z-index: 1;
    }

    .heading-wrap {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 15px;
        z-index: 2;
        img {
            width: 90px;
            height: 90px;
            @media screen and (max-width: 728px) {
                display: none;
            }
        }
        .inner-heading-holder-wrap {
            .logo-footer {
                color: #c69536;
                padding: 0;
            }
            .sub-heading-footer {
                color: #7c5e26;
            }
        }
        
        
    }

    .global-wrap {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 150px;
        z-index: 2;

        @media screen and (max-width: 728px) {
            gap: 25px;
        }

        .block {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: column;

            ul {
                margin: 0;
                padding: 0;
                li:first-child {
                    font-size: 18px;
                    font-weight: 600;
                }
                li {
                    list-style-type: none;
                    text-decoration: none;
                    color: #ffffff;
                    font-weight: 300;
                }
            }
            p {
                color: #ffffff;
                padding: 0;
                margin: 0;

            }
            a {
                color: #ffffff;
            }
            .admin-login {
                text-decoration: underline;
                cursor: pointer;
            }
            .admin-login:hover {
                color: #c69536;
            }
            .social-media-list {
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                gap: 15px;
                width: 100%;
                margin: 8px 0 15px 0;
            }
            .copyright {
                color: #a3a3a3;
                font-size: 12px;
                font-weight: 300;
            }
        }
    }
}
`