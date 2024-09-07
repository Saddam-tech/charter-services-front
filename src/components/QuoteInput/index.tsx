import React, { useEffect, useState } from 'react'
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
import { Dayjs } from 'dayjs';
import {
    MuiTelInput,
    MuiTelInputCountry,
    MuiTelInputInfo,
    MuiTelInputContinent,
} from 'mui-tel-input'
import { _errorState, c_quote_default, dropdown_data } from 'data';
import { EPS, provider } from 'configs/axios';
import { useToasts } from 'react-toast-notifications';
import { MESSAGES } from 'utils/messages';
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
    status?: number;
}

interface errorState {
    pickup_location_error: boolean;
    dropoff_location_error: boolean;
}

interface Data {
    model_name: string;
    brand_name: string;
    description: string;
    seats: number;
    uuid: string;
    active: number;
    type: string;
    urlToS3: string;
}

const QuoteInput = () => {
    const [process, setProcess] = useState<number>(0);
    const [errorState, setErrorState] = useState<errorState>(_errorState);
    const [state, setState] = useState<iState>(c_quote_default);
    const continents: MuiTelInputContinent[] = ['NA', 'SA', 'EU']
    const excludedCountries: MuiTelInputCountry[] = []
    const [fleetArr, setFleetArr] = useState<string[]>([]);
    const { addToast } = useToasts();

    async function loadFleet() {
        try {
            const { data: { response } } = await provider.get(EPS.FLEET);
            const filtered = response.filter((el: Data) => el.active == 1);
            let arr = [];
            for (let item of filtered) {
                let { brand_name, model_name, seats } = item;
                arr.push(`${model_name} ${brand_name} (${seats} seats)`);
            }
            setFleetArr(arr);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadFleet();
    }, [])

    async function submitHandler() {
        try {
            switch (process) {
                case 0:
                    if (state?.pickup_location === "") {
                        setErrorState(prev => ({ ...prev, pickup_location_error: true }))
                    }
                    if (state?.dropoff_location === "") {
                        setErrorState(prev => ({ ...prev, dropoff_location_error: true }))
                    }
                    if (state?.pickup_location !== "" && state?.dropoff_location !== "") {
                        setErrorState({ pickup_location_error: false, dropoff_location_error: false })
                        setProcess(1);
                    }
                    break;
                case 1:
                    await provider.post(EPS.ORDERS, state);
                    setProcess(0);
                    addToast(MESSAGES.ORDER_POSTED, {
                        appearance: 'success',
                        autoDismiss: true
                    })
                    setState(c_quote_default);
                    break;
                default:
                    setProcess(0);
                    setState(c_quote_default);
                    break;

            }
        } catch (err) {
            addToast(MESSAGES.ERROR, {
                appearance: 'error',
                autoDismiss: true
            })
            console.log(err)
        }
    }

    const process0 = <ThemeProvider theme={theme}>
        <UnstyledSelectIntroduction type='type' setState={setState} options={dropdown_data[0]} />
        <DatenTimePicker state={state} setState={setState} />
        <UnstyledSelectIntroduction type='n_ppl' setState={setState} options={dropdown_data[1]} />
        <UnstyledSelectIntroduction type="car_type" setState={setState} options={['Select your ride', ...fleetArr]} />
        <Box
            component="form"
            sx={{ width: '100%' }}
            noValidate
            autoComplete="off"
        >
            <TextField
                onChange={(e) => setState((prev) => ({ ...prev, pickup_location: e.target.value }))}
                helperText={errorState.pickup_location_error && "This field is required!"}
                error={errorState.pickup_location_error}
                fullWidth
                id="pickup_location"
                label="Pick-up location"
                variant="filled"
            />
            <TextField
                onChange={(e) => setState((prev) => ({ ...prev, dropoff_location: e.target.value }))}
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
                onChange={(e) => setState((prev) => ({ ...prev, firstname: e.target.value }))}
                helperText={errorState.pickup_location_error && "This field is required!"}
                error={errorState.pickup_location_error}
                fullWidth
                id="firstname"
                label="Firstname"
                variant="filled"
            />
            <TextField
                onChange={(e) => setState((prev) => ({ ...prev, lastname: e.target.value }))}
                helperText={errorState.dropoff_location_error && "This field is required!"}
                error={errorState.dropoff_location_error}
                sx={{ margin: '10px 0 0 0' }}
                fullWidth
                id="lastname"
                label="Lastname"
                variant="filled"
            />
            <TextField
                onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value }))}
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
                onChange={(value) => setState((prev) => ({ ...prev, phonenumber: value }))}
                continents={continents}
                excludedCountries={excludedCountries}
                defaultCountry='US'
                sx={{ width: '100%', padding: '10px 0' }}
            />
            <Textarea value={state?.special_req} onChange={(e) => setState((prev) => ({ ...prev, special_req: e.target.value }))} placeholder="Special Request" />
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
    padding: 20px;
    p {
        margin: 0;
        text-align: center;
        width: 100%;
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
}
`;


const Textarea = styled.textarea`
    width: 100%;
    background-color: rgb(255, 255, 255, 0.3);
    border: 1px solid #adadad;
    border-radius: 10px;
    padding: 10px;
    @media screen and (max-width: 728px) {
        width: 100%;
    }
`