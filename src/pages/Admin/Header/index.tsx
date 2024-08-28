import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContrastIcon from '@mui/icons-material/Contrast';
import { useNavigate } from "react-router-dom";
import { ProfileCreds } from 'configs/types';
import { defaultAdmin } from 'configs/constants';
import { EPS, provider } from 'configs/axios';

const Header = () => {
    const navigate = useNavigate();
    const [adminInfo, setAdminInfo] = useState<ProfileCreds>(defaultAdmin);

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
            <div className="logo-wrap">
                <img src={require('assets/schs-mainlogo.png')} alt="profile-pic" />
                <p>admin</p>
            </div>
            <div className="logo-wrap">
                <ContrastIcon sx={{ fontSize: '30px' }} />
                <img onClick={() => navigate('/admin/profile')} className="profile" src={adminInfo.profileImgUrl} alt="profile-pic" />
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
            border: 2px solid #ffffff;
            cursor: pointer;
        }
    
}
`