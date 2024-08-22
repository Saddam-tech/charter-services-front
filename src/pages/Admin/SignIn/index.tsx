import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from 'styled-components'
import { EPS, provider } from "configs/axios";

import { useToasts } from 'react-toast-notifications';
import { MESSAGES } from 'utils/messages';

interface IProps {
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

interface Credentials {
    username: string;
    password: string;
}

const SignIn = ({ setToken }: IProps) => {
    const [credentials, setCredentials] = useState<Credentials>({ username: '', password: '' });
    const { addToast } = useToasts();
    async function loginHandler() {
        try {
            if (!credentials.username) {
                addToast(MESSAGES.NO_USERNAME, {
                    appearance: 'error',
                    autoDismiss: true
                })
                return;
            }
            if (!credentials.password) {
                addToast(MESSAGES.NO_PASSWORD, {
                    appearance: 'error',
                    autoDismiss: true
                })
                return;
            }
            const payload = { username: credentials.username, password: credentials.password };
            const response = await provider.post(EPS.ADMIN_SIGNIN, payload)
            console.log({ response })
            let { token } = response?.data;
            if (!token) {
                addToast(MESSAGES.USER_NOT_FOUND, {
                    appearance: 'error',
                    autoDismiss: true
                })
                return;
            }
            localStorage.setItem('authorizationToken', token);
            setToken(token);
            window.location.reload();

        } catch (err) {
            addToast(MESSAGES.ERROR, {
                appearance: 'error',
                autoDismiss: true
            })
            console.log(err);
        }
    }
    return (
        <Container>
            <ParentWrap>
                <TextWrap>
                    <h1>Welcome Back, Azizbek!</h1>
                    <img src={require('assets/schs-mainlogo.png')} alt="" className="main-logo" />
                    <p>Enter your credentials to login</p>
                </TextWrap>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <LoginBoard>
                        <TextField
                            required
                            error={false}
                            id="filled-multiline-flexible"
                            label="Admin id"
                            multiline
                            maxRows={4}
                            variant="filled"
                            onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                        />
                        <TextField
                            required
                            error={false}
                            id="filled-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="filled"
                            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                        />
                        <Button onClick={loginHandler} sx={{ width: '95%', margin: '20px 0' }} variant="contained">Submit</Button>
                    </LoginBoard>
                </Box>


            </ParentWrap>
        </Container>
    )
}

export default SignIn

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: linear-gradient(to right,  #fff6a3, #ffb6e3);
    height: 100vh;
`

const ParentWrap = styled.article`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
    gap: 10px;
    background-color: #ffffff;
    border-radius: 20px;
    padding: 40px;
    background-image: linear-gradient(to right,  #fcfae5, #ffdaf1);
`

const TextWrap = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 300px;
    width: 100%;
    text-align: center;
    img {
                max-width: 210px;
                width: auto;
            }
`

const LoginBoard = styled.section`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: 100%;
padding: 0 20px;
`