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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
    MuiTelInput,
    MuiTelInputCountry,
    MuiTelInputInfo,
    MuiTelInputContinent,
} from 'mui-tel-input'

const dropdown_data1 = ['Point-to-Point transportation', 'Hourly Ride', 'Airport pick-up/drop-off'];
const dropdown_data2 = new Array(10).fill("passenger").map((el, i) => (i + 1) + " " + el + (i > 0 ? "s" : ""));
const dropdown_data3 = ['Tesla Model 3 (5 seats)', 'Cadillac Escalade (8 seats)', 'BMW i7 (5 seats)', 'Mercedes Vito (11 seats)', 'Charter Bus (24 seats)'];
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
interface iState {
    phonenumber: string;
}


const QuoteInput = () => {
    const navigate = useNavigate();
    const [process, setProcess] = useState<number>(0);
    const [dropdownValue1, setDropdownValue1] = useState<string[]>();
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [pickup, setPickup] = useState<string>('');
    const [dropoff, setDropoff] = useState<string>('');
    const [errorState, setErrorState] = useState({ pickup_location_error: false, dropoff_location_error: false });
    const [state, setState] = useState<iState>({ phonenumber: '' });
    const continents: MuiTelInputContinent[] = ['NA', 'SA', 'EU']
    const excludedCountries: MuiTelInputCountry[] = []

    function handlePhoneInput(newValue: string, info: MuiTelInputInfo) {
        setState(() => ({ phonenumber: newValue }));
    }

    function submitHandler() {
        switch (process) {
            case 0:
                if (pickup === "") {
                    setErrorState(prev => ({ ...prev, pickup_location_error: true }))
                }
                if (dropoff === "") {
                    setErrorState(prev => ({ ...prev, dropoff_location_error: true }))
                }
                if (pickup !== "" && dropoff !== "") {
                    setErrorState({ pickup_location_error: false, dropoff_location_error: false })
                    setProcess(1);
                }
                break;
            case 1:
                break;
            default:
                setProcess(0);
                break;

        }

    }

    const process0 = <ThemeProvider theme={theme}>
        <UnstyledSelectIntroduction options={dropdown_data1} />
        <DatenTimePicker />
        <UnstyledSelectIntroduction options={dropdown_data2} />
        <UnstyledSelectIntroduction options={dropdown_data3} />
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

    const process1 = <ThemeProvider theme={theme}>
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <TextField
                onChange={(e) => setPickup(e.target.value)}
                helperText={errorState.pickup_location_error && "This field is required!"}
                error={errorState.pickup_location_error}
                fullWidth
                id="firstname"
                label="Firstname"
                variant="filled"
            />
            <TextField
                onChange={(e) => setDropoff(e.target.value)}
                helperText={errorState.dropoff_location_error && "This field is required!"}
                error={errorState.dropoff_location_error}
                sx={{ margin: '10px 0 0 0' }}
                fullWidth
                id="lastname"
                label="Lastname"
                variant="filled"
            />
            <TextField
                onChange={(e) => setDropoff(e.target.value)}
                helperText={errorState.dropoff_location_error && "This field is required!"}
                error={errorState.dropoff_location_error}
                sx={{ margin: '10px 0 0 0' }}
                fullWidth
                id="email"
                label="Email"
                variant="filled"
            />
            <MuiTelInput
                value={state?.phonenumber}
                onChange={handlePhoneInput}
                continents={continents}
                excludedCountries={excludedCountries}
                defaultCountry='US'
                sx={{ width: '100%', padding: '10px 0' }}
            />
            <TextareaAutosize
                onChange={(e) => setDropoff(e.target.value)}
                aria-label="empty textarea"
                placeholder="Special Request"
            />
        </Box>

        <Button onClick={submitHandler} sx={{ width: '100%', backgroundColor: '#c69536', color: '#ffffff' }} variant='contained'>Submit</Button>
    </ThemeProvider>

    function returnContent() {
        switch (process) {
            case 0:
                return process0;
            case 1:
                return process1;
            default:
                return process0;
        }
    }

    return (
        <Container>
            <div className="quote-type-select">
                {process === 1 && <ArrowBackIosIcon onClick={() => setProcess(0)} sx={{ cursor: 'pointer', color: '#ffffff' }} />}
                <p>Custom Quote</p>
            </div>
            <section className="input-tab-wrapper">
                {returnContent()}
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
    background-color: #c6963685;
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
    max-width: 550px;
    width: 100%;
}
`;
const yellow = {
    100: '#fff9ee',
    200: '#ffe5b0',
    400: '#fdd585',
    500: '#c69536',
    600: '#855900',
    900: '#251900',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const TextareaAutosize = mui_styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 18px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${yellow[400]};
    }
  
    &:focus {
      border-color: ${yellow[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? yellow[600] : yellow[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);
