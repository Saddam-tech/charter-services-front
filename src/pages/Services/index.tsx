import React from 'react'
import styled from 'styled-components'
import profileBackground from "assets/services-background.webp"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { socials } from 'data';
const socialsConf = { fontSize: 40, color: "#ffffff" };
const Services = () => {
    return (
        <Container>
            {/* profile-wrap */}
            <section className="profile-wrap">
                <div className="backdrop"></div>
                <div className="text-wrap">
                    <h1>OUR SERVICES</h1>
                    <p>SCHS offers professional transportation for any occasion. We have been trusted to transport over 6 million people for over 30 years. Whether you’re looking for a custom wine tour or need logistics coordinated for your annual tradeshow, we have a solution for you.</p>
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
                    <li>Corporate Services</li> |
                    <li>Charters</li> |
                    <li>Events & Entertainment</li> |
                    <li>Custom solutions</li>
                </ul>
            </section>
            {/* strip map */}
        </Container>
    )
}

export default Services

const Container = styled.section`
background-color: #000000;
height: 100vh;
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
        gap: 20px;
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
        }
        li:hover {
            color: #767676
        }
    }
}
`;