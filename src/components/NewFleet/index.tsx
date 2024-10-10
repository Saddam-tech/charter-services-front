import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { EPS, provider } from 'configs/axios';
import LinearProgress from '@mui/material/LinearProgress';
import { useToasts } from 'react-toast-notifications';
import { MESSAGES } from 'utils/messages';
import { defaultFleet, fleetTypes } from 'configs/constants';



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


interface Data {
    model_name?: string;
    brand_name?: string;
    description?: string;
    seats?: string;
    active?: boolean;
    type?: string;
    file?: File
}


const NewFleet = ({ reload, close }: { reload: () => void; close: () => void }) => {
    const [data, setData] = useState<Data>(defaultFleet);
    const [loader, setLoader] = useState<boolean>(false);
    const { addToast } = useToasts();
    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            const file = event?.target?.files[0] ?? null;
            setData(prev => ({ ...prev, file }));
        }
    }

    async function handleSubmit() {
        try {
            if (!data?.file) {
                return;
            }
            const formData = new FormData();
            for (let [key, value] of Object.entries(data || {})) {
                formData.append(key, value);
            }
            setLoader(true);
            await provider.post(EPS.NEW_FLEET, formData);
            setLoader(false);
            addToast(MESSAGES.UPLOAD_COMPLETE('Fleet'), {
                appearance: 'success',
                autoDismiss: true,
            });
            reload();
            close();
        } catch (err) {
            console.log(err);
            setLoader(false);
            close();
        }
    }

    return (
        <Container>
            <div className="quote-type-select">
                <p>New Fleet</p>
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
                            <label htmlFor="bannerInput">Select Fleet Image</label>
                            <input id="bannerInput" type="file" name="imageInput" onChange={handleFileChange} />
                        </div>
                        <TextField
                            onChange={(event) => setData(prev => ({ ...prev, brand_name: event.target.value }))}
                            // helperText={errorState.dropoff_location_error && "This field is required!"}
                            // error={errorState.dropoff_location_error}
                            sx={{ margin: '10px 0 0 0' }}
                            type="text"
                            fullWidth
                            id="brand-input"
                            label="Brand name"
                        />
                        <TextField
                            onChange={(event) => setData(prev => ({ ...prev, model_name: event.target.value }))}
                            // helperText={errorState.dropoff_location_error && "This field is required!"}
                            // error={errorState.dropoff_location_error}
                            sx={{ margin: '10px 0 0 0' }}
                            type="text"
                            fullWidth
                            id="model-input"
                            label="Model name"
                        />
                        <Select value={data?.seats} onChange={(e) => setData(prev => ({ ...prev, seats: e.target.value }))}>
                            {new Array(50).fill("passenger").map((el, i) => i + 1 + " " + el + (i > 0 ? "s" : "")).map((el, i) => (
                                <option key={i} value={i + 1}>
                                    {el}
                                </option>
                            ))}
                        </Select>
                        <Select value={data?.type} onChange={(e) => setData(prev => ({ ...prev, type: e.target.value }))}>
                            {fleetTypes.map((el, i) => (
                                <option key={i} value={el}>
                                    {el}
                                </option>
                            ))}
                        </Select>
                        <Textarea value={data?.description} onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))} placeholder="Description" />
                        <div className="switch-wrap">
                            <span>Active</span>
                            <Switch
                                edge="end"
                                onChange={() => setData((prev) => ({ ...prev, active: !data?.active }))}
                                checked={data?.active}
                                disabled={false}
                                inputProps={{
                                    'aria-labelledby': 'switch-list-label-wifi',
                                }}
                            />
                        </div>
                    </Box>
                    {
                        loader ? (<Box sx={{ width: '100%', height: '10px' }}>
                            <LinearProgress />
                        </Box>) : (<Button onClick={handleSubmit} sx={{ width: '100%', backgroundColor: '#c69536', color: '#ffffff' }} variant='contained'>Submit</Button>)
                    }
                </ThemeProvider>
            </section>
        </Container>
    )
}

export default NewFleet

const Container = styled.section`
z-index: 7;
color: #000;
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

const Textarea = styled.textarea`
    width: 100%;
    height: 200px;
    background-color: rgb(255, 255, 255, 0.3);
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0 0 0;
    @media screen and (max-width: 728px) {
        width: 100%;
    }
`

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #c69536;
  border-radius: 10px;
  font-weight: 300;
  cursor: pointer;
  margin: 10px 0 0 0;
`;
