import ProfileCard from 'components/ProfileCard';
import { EPS, provider } from 'configs/axios';
import { defaultAdmin } from 'configs/constants';
import { ProfileCreds } from 'configs/types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Profile = () => {
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
            <ProfileCard adminInfo={adminInfo} setState={setAdminInfo} />
        </Container>
    )
}

export default Profile

const Container = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;
`