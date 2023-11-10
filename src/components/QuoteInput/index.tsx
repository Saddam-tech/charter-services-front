import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DatenTimePicker from 'components/DatenTimePicker';
import UnstyledSelectIntroduction from 'components/UnstyledSelectIntroduction';
import Button from '@mui/material/Button';
import { styled } from 'styled-components';

const dropdown_data1 = ['Point-to-Point transportation', 'Hourly Ride', 'Airport pick-up/drop-off'];
const dropdown_data2 = new Array(10).fill("passenger").map((el, i) => (i + 1) + " " + el + (i > 0 ? "s" : ""));

const QuoteInput = () => {
    const [dropdownValue1, setDropdownValue1] = useState<string[]>();
    return (
        <Container>
            <div className="quote-type-select">
                <p>Instant Quote</p>
                <p>Custom Quote</p>
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
                    <TextField fullWidth id="pickup_location" label="Pick-up location" variant="filled" />
                    <TextField sx={{ margin: '10px 0 0 0' }} fullWidth id="dropoff_location" label="Drop-off location" variant="filled" />
                </Box>
                <Button sx={{ width: '100%' }} variant="contained">Continue</Button>
            </section>
        </Container>
    )
}

export default QuoteInput

const Container = styled.section`
position: absolute;
left: 500px;
top: 0;

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

