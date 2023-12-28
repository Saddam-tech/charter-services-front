import styled from "styled-components";
import profileBackground from 'assets/pic-section0-0.webp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Fade } from "react-awesome-reveal";
import QuoteInput from "components/QuoteInput";
import { socials } from "data";
const socialsConf = { fontSize: 20, color: "#ffffff" };
const AboutUs = () => {
    return (
        <Container>
            {/* profile-section */}
            <Fade cascade damping={0.1}>
                <section className="profile-wrap">
                    <div className="backdrop"></div>
                    <img src={require('assets/aziz-profile-pic.webp')} alt="profile-pic" />
                    <div className="text-wrap">
                        <div className="header-wrap">
                            <h1>Founder & CEO</h1>
                            <a href="https://x.com/summitchs?s=21&t=OUzCNaAdoBfN9wkW-UmD_g" target="_blank" rel="noreferrer">
                                <LinkedInIcon sx={{ fontSize: 20, color: '#ffffff' }} />
                            </a>
                        </div>
                        <p>
                            Welcome to Summit Charter Services, where luxury and reliability converge to redefine transportation experiences. I founded this company out of a passion for providing exceptional limousine and charter bus services that go beyond mere transportation.
                            My interest in the industry was sparked by a desire to create a service that seamlessly blends sophistication with dependability. Having experienced the challenges of finding premium transportation firsthand, I envisioned Summit Charter Services as the solution—a company dedicated to exceeding expectations and setting new standards in the world of luxury travel.
                            Our commitment to excellence is rooted in the belief that every journey should be more than just a ride; it should be an experience marked by comfort, style, and a touch of indulgence. Whether it's a special event, corporate travel, or airport transfer, Summit Charter Services is designed to elevate your transportation moments.
                            We take pride in our meticulously maintained fleet of limousines and charter buses, paired with a team of professional and courteous drivers. At Summit, we don't just provide transportation; we craft unforgettable journeys that leave a lasting impression.
                            Thank you for choosing Summit Charter Services for your travel needs. We look forward to being a part of your remarkable journeys.

                            <br />
                            <br />

                            Sincerely,

                            <br />
                            <br />

                            Azizbek Abduganiev

                            <br />
                            <br />

                            Founder and CEO of
                            Summit Charter Services
                        </p>
                    </div>
                </section>
            </Fade>
            {/* profile-section */}
            <section className="quote-input-wrap">
                <h1>Make a quick reservation now!</h1>
                <div className="quote-input">
                    <Fade damping={0.1}>
                        {/* custom quote input */}
                        <QuoteInput />
                        {/* custom quote input */}
                    </Fade>
                </div>
            </section>

            {/* footer */}
            <section className="footer-section">
                <div className="backdrop"></div>
                <div className="heading-wrap">
                    <Fade cascade damping={0.1}>
                        <div className="inner-heading-holder-wrap">
                            <h1 className="logo-footer">Summit Charter Services</h1>
                            <p className="sub-heading-footer">Charter Bus and Executive Black Car Services</p>
                        </div>
                        <img src={require('assets/schs-mainlogo.png')} alt="schs-mainlog-white" />
                    </Fade>
                </div>
                <section className="global-wrap">
                    <Fade cascade damping={0.1}>
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
                            <a target="blank" href="mailto:info@summitchs.com">info@summitchs.com</a>
                            <a href="tel:+1(628) 224 7797">+1(628) 224 7797</a>
                            <a href="tel:+1(628) 800 4555">+1(628) 800 4555</a>
                            <p>55 Chumasero Drive , San Francisco, CA 94132</p>
                            <div className="social-media-list">
                                {socials.map((el, i) => (
                                    <a key={i} target="_blank" rel="noreferrer" href={el.path}>
                                        <el.icon sx={socialsConf} />
                                    </a>
                                ))}
                            </div>
                            <p className="copyright">© {new Date().getFullYear()} Charter and Executive Black Car Services</p>
                        </div>
                    </Fade>
                </section>
            </section>
            {/* footer */}
        </Container>
    )
}

export default AboutUs

const Container = styled.section`
display: flex;
flex-direction: column;
background-color: #000000;
height: 100vh;

.profile-wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-image: url(${profileBackground});
    background-size: cover;
    padding: 150px 20px;
    position: relative;

    @media screen and (max-width: 728px) {
        flex-direction: column;
        padding: 40px 20px;
        gap: 50px;
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

    img {
        max-width: 500px;
        width: 100%;
        border-radius: 50%;
        z-index: 2;
        border: 10px solid #c69536;
        @media screen and (max-width: 728px) {
            max-width: 300px;
        }
    }

    .text-wrap {
        max-width: 800px;
        width: 100%;
        z-index: 2;
        .header-wrap {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 7px;
            @media screen and (max-width: 728px) {
               justify-content: center;
               font-size: 14px;
            }
            h1 {
                color: #c69536;
            }
        }
        p {
            color: #a88541;
            font-size: 20px;

            @media screen and (max-width: 728px) {
               font-size: 18px;
            }
        }
    }
}
.quote-input-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    padding: 20px;
    background-color: #000000;

    h1 {
        color: #c69536;
    }
    .quote-input {
        max-width: 500px;
        width: 100%;
    }
}

.footer-section {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    background-color: #000000;
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
`;