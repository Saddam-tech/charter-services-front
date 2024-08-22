import { EPS, provider } from 'configs/axios';
import { defaultAdmin } from 'configs/constants';
import { ProfileCreds } from 'configs/types';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const [adminInfo, setAdminInfo] = useState<ProfileCreds>(defaultAdmin);
    const navigate = useNavigate();

    async function loadProfile() {
        try {
            const { data: { admin } } = await provider.get(EPS.ADMIN_INFO);
            setAdminInfo(admin);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        loadProfile();
    }, [])
    return (
        <Container>
            <InnerWrap>
                <img src={adminInfo.profileImgUrl} alt="profile-pic" />
                <h1>Welcome, {adminInfo.firstname} {adminInfo.lastname}</h1>
                <p>Manage your info, page banners and posts conveniently with a click of a button!</p>
            </InnerWrap>
            <Content onClick={() => navigate('/admin/orders/incoming')}>
                <div className="box long">
                    <h2>Incoming orders</h2>
                    <p>View all the incoming orders here</p>
                </div>
            </Content>
            <Content>
                <div onClick={() => navigate('/admin/banners')} className="box">
                    <h2>Banners</h2>
                    <p>Upload and modify your banners here</p>
                </div>
                <div onClick={() => navigate('/admin/blogs')} className="box">
                    <h2>Blogs</h2>
                    <p>Post your blogs here</p>
                </div>
            </Content>
            <Content>
                <div onClick={() => navigate('/admin/services')} className="box">
                    <h2>Services</h2>
                    <p>Modify your services here</p>
                </div>
                <div onClick={() => navigate('/admin/fleet')} className="box">
                    <h2>Fleet</h2>
                    <p>Post new fleet here</p>
                </div>
            </Content>
            <Content>
                <div onClick={() => navigate('/admin/careers')} className="box">
                    <h2>Careers</h2>
                    <p>Post new job openings</p>
                </div>
                <div onClick={() => navigate('/admin/contact-info')} className="box">
                    <h2>Contact info</h2>
                    <p>Modify your contact info</p>
                </div>
            </Content>
        </Container>
    )
}

export default Main

const Container = styled.section`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: 100%;
padding: 0 10px;
`

const InnerWrap = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;

    img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 6px solid #ffffff;
        object-fit: cover;
    }
    h1 {
        font-size: 24px;

    }
`

const Content = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    width: 100%;
    gap: 20px;

    .box {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        border: 1px solid #dbdbdb;
        background-color: #ffffff75;
        padding: 15px;
        border-radius: 15px;
        max-width: 400px;
        width: 100%;
        cursor: pointer;
        &:hover {
            opacity: 0.6;
        }
    }

    .long {
        max-width: 820px;
        width: 100%;
    }
`