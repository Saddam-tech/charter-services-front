import React from 'react'
import styled from 'styled-components'

const Main = () => {
    return (
        <Container>
            <InnerWrap>
                <img src={require('assets/aziz-profile-pic.webp')} alt="profile-pic" />
                <h1>Welcome, Azizbek Abduganiev</h1>
                <p>Manage your info, page banners and posts conveniently with a click of a button!</p>
            </InnerWrap>
            <Content>
                <div className="box long">
                    <h2>Incoming orders</h2>
                    <p>View all the incoming orders here</p>
                </div>
            </Content>
            <Content>
                <div className="box">
                    <h2>Banners</h2>
                    <p>Upload and modify your banners here</p>
                </div>
                <div className="box">
                    <h2>Blogs</h2>
                    <p>Post your blogs here</p>
                </div>
            </Content>
            <Content>
                <div className="box">
                    <h2>Services</h2>
                    <p>Modify your services here</p>
                </div>
                <div className="box">
                    <h2>Fleet</h2>
                    <p>Post new fleet here</p>
                </div>
            </Content>
            <Content>
                <div className="box">
                    <h2>Careers</h2>
                    <p>Post new job openings</p>
                </div>
                <div className="box">
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
        border-radius: 50%;
        outline: 2px solid #868686;
        border: 4px solid #ffffff;
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