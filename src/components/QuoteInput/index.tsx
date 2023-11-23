import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DatenTimePicker from 'components/DatenTimePicker';
import UnstyledSelectIntroduction from 'components/UnstyledSelectIntroduction';
import Button from '@mui/material/Button';
import { styled } from 'styled-components';
import { useNavigate } from "react-router-dom";

const dropdown_data1 = ['Point-to-Point transportation', 'Hourly Ride', 'Airport pick-up/drop-off'];
const dropdown_data2 = new Array(10).fill("passenger").map((el, i) => (i + 1) + " " + el + (i > 0 ? "s" : ""));

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
                <p onClick={() => setActiveIndex(0)} className={activeIndex === 0 ? "active" : ""}>Instant Quote</p>
                <p onClick={() => setActiveIndex(1)} className={activeIndex === 1 ? "active" : ""}>Custom Quote</p>
            </div>
            <section className="input-tab-wrapper">
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
                <Button onClick={submitHandler} sx={{ width: '100%' }} variant="contained">Continue</Button>
            </section>
        </Container>
    )
}

export default QuoteInput

const Container = styled.section`
position: absolute;
right: 200px;
top: 50px;
opacity: 0.8;
z-index: 1;

@media screen and (max-width: 728px) {
    position: relative;
    left: 0;
    top: 10px;
}

&:hover {
    opacity: 1;
}
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
        cursor: pointer;
    }
    .active {
        background-color: #007FFF;
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

