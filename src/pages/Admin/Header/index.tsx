import React from 'react'
import styled from 'styled-components'
import ContrastIcon from '@mui/icons-material/Contrast';

const Header = () => {
    return (
        <Container>
            <div className="logo-wrap">
                <img src={require('assets/schs-mainlogo.png')} alt="" />
                <p>admin</p>
            </div>
            <div className="logo-wrap">
                <ContrastIcon sx={{ fontSize: '30px' }} />
                <img className="profile" src={require('assets/aziz-profile-pic.webp')} alt="profile-pic" />
            </div>
        </Container>
    )
}

export default Header

const Container = styled.section`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
padding: 0 20px;
.logo-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    img {
        max-width: 110px;
        width: auto;
        @media screen and (max-width: 728px) {
            max-width: 80px;
        }
    }
    .profile {
            width: 50px;
            border-radius: 50%;
            outline: 1px solid #868686;
            border: 2px solid #ffffff;
            cursor: pointer;
        }
    
}
`