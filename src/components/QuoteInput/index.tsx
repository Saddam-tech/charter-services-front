import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DatenTimePicker from 'components/DatenTimePicker';
import UnstyledSelectIntroduction from 'components/UnstyledSelectIntroduction';
import Button from '@mui/material/Button';
import { styled } from 'styled-components';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const dropdown_data1 = ['Point-to-Point transportation', 'Hourly Ride', 'Airport pick-up/drop-off'];
const dropdown_data2 = new Array(10).fill("passenger").map((el, i) => (i + 1) + " " + el + (i > 0 ? "s" : ""));
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


const QuoteInput = () => {
    const navigate = useNavigate();
    const [dropdownValue1, setDropdownValue1] = useState<string[]>();
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [pickup, setPickup] = useState<string>('');
    const [dropoff, setDropoff] = useState<string>('');
    const [errorState, setErrorState] = useState({ pickup_location_error: false, dropoff_location_error: false });

    function submitHandler() {
        try {
            if (pickup === "") {
                setErrorState(prev => ({ ...prev, pickup_location_error: true }))
            }
            if (dropoff === "") {
                setErrorState(prev => ({ ...prev, dropoff_location_error: true }))
            }
            if (pickup !== "" && dropoff !== "") {
                setErrorState({ pickup_location_error: false, dropoff_location_error: false })
                navigate('reservation')
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Container>
            <div className="quote-type-select">
                <p className="active">Custom Quote</p>
            </div>
            <section className="input-tab-wrapper">
                <ThemeProvider theme={theme}>
                    <UnstyledSelectIntroduction options={dropdown_data1} />
                    <DatenTimePicker />
                    <UnstyledSelectIntroduction options={dropdown_data2} />
                    <Box
                        component="form"
                        sx={{ width: '100%' }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            onChange={(e) => setPickup(e.target.value)}
                            helperText={errorState.pickup_location_error && "This field is required!"}
                            error={errorState.pickup_location_error}
                            fullWidth
                            id="pickup_location"
                            label="Pick-up location"
                            variant="filled"
                        />
                        <TextField
                            onChange={(e) => setDropoff(e.target.value)}
                            helperText={errorState.dropoff_location_error && "This field is required!"}
                            error={errorState.dropoff_location_error}
                            sx={{ margin: '10px 0 0 0' }}
                            fullWidth
                            id="dropoff_location"
                            label="Drop-off location"
                            variant="filled"
                        />
                    </Box>

                    <Button onClick={submitHandler} sx={{ width: '100%', backgroundColor: '#c69536', color: '#ffffff' }} variant='contained'>Continue</Button>
                </ThemeProvider>
            </section>
        </Container>
    )
}

export default QuoteInput

const Container = styled.section`
.quote-type-select {
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        padding: 20px;
        margin: 0;
        text-align: center;
        background-color: #ffffff;
        color: #000000;
        width: 100%;
        font-weight: 700;
    }
    .active {
        background-color: #c6963685;
        color: #ffffff;
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
}
`;

