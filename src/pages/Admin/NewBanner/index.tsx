import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DatenTimePicker from 'components/DatenTimePicker';
import UnstyledSelectIntroduction from 'components/UnstyledSelectIntroduction';
import Button from '@mui/material/Button';
import { styled } from 'styled-components';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled as mui_styled } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { Dayjs } from 'dayjs';
import { _errorState, c_quote_default } from 'data';
import { EPS, provider } from 'configs/axios';


const theme = createTheme({
    palette: {
        primary: {
            main: '#c69536'
        },
        secondary: {
            main: '#c6963685'
        }
    },
});


export interface iState {
    type: string;
    date: Dayjs | null;
    time: Dayjs | null;
    car_type: string;
    n_ppl: string;
    pickup_location: string;
    dropoff_location: string;
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    special_req: string;
}

interface errorState {
    pickup_location_error: boolean;
    dropoff_location_error: boolean;
}

const NewBanner = () => {
    const navigate = useNavigate();
    const [process, setProcess] = useState<number>(0);
    const [errorState, setErrorState] = useState<errorState>(_errorState);
    const [state, setState] = useState<iState>(c_quote_default);


    return (
        <Container>
            <div className="quote-type-select">
                <p>New Banner</p>
            </div>
            <section className="input-tab-wrapper">
                <ThemeProvider theme={theme}>
                    <Box
                        component="form"
                        sx={{ width: '100%' }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="image-input-wrap">
                            <label htmlFor="bannerInput">Select Banner Image</label>
                            <input id="bannerInput" type="file" name="imageInput" />
                        </div>
                        <TextField
                            onChange={() => { }}
                            // helperText={errorState.dropoff_location_error && "This field is required!"}
                            error={errorState.dropoff_location_error}
                            sx={{ margin: '10px 0 0 0' }}
                            type="number"
                            fullWidth
                            id="dropoff_location"
                            label="View Order"
                            variant="filled"
                        />
                        <div className="switch-wrap">
                            <span>Active</span>
                            <Switch
                                edge="end"
                                onChange={() => { }}
                                checked={true}
                                disabled={false}
                                inputProps={{
                                    'aria-labelledby': 'switch-list-label-wifi',
                                }}
                            />
                        </div>
                    </Box>
                    <Button onClick={() => { }} sx={{ width: '100%', backgroundColor: '#c69536', color: '#ffffff' }} variant='contained'>Submit</Button>
                </ThemeProvider>
            </section>
        </Container>
    )
}

export default NewBanner

const Container = styled.section`
z-index: 7;
.quote-type-select {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c69636;
    p {
        padding: 20px;
        margin: 0;
        text-align: center;
        width: 85%;
        color: #ffffff;
        font-weight: 700;
    }
}

.input-tab-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-direction: column;
    background-color: #ffffff;
    padding: 10px;
    max-width: 450px;
    width: 100%;

    .image-input-wrap {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        gap: 10px;
    }
    .switch-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
}
`;



