import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
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


interface data {
    file: File | null;
    order: string | null;
    active: boolean;
}


const NewBanner = ({ currentSection }: { currentSection: number | null }) => {
    const [data, setData] = useState<data>({ file: null, order: null, active: true })

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            const file = event?.target?.files[0] ?? null;
            console.log(file)
            setData(prev => ({ ...prev, file }));
        }
    }

    async function handleSubmit() {
        try {
            if (!data?.file || !data?.order || !currentSection) {
                return;
            }
            let reqData = {
                file: data.file,
                sequence: data.order,
                active: data.active,
                section: currentSection
            }
            const response = await provider.post(EPS.BANNERS, reqData)
            console.log({ response })
        } catch (err) {
            console.log(err)
        }
    }

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
                            <input id="bannerInput" type="file" name="imageInput" onChange={handleFileChange} />
                        </div>
                        <TextField
                            onChange={(event) => setData(prev => ({ ...prev, order: event.target.value }))}
                            // helperText={errorState.dropoff_location_error && "This field is required!"}
                            // error={errorState.dropoff_location_error}
                            sx={{ margin: '10px 0 0 0' }}
                            type="number"
                            fullWidth
                            id="view-order"
                            label="View Order"
                        />
                        <div className="switch-wrap">
                            <span>Active</span>
                            <Switch
                                edge="end"
                                onChange={() => setData((prev) => ({ ...prev, active: !data.active }))}
                                checked={data.active}
                                disabled={false}
                                inputProps={{
                                    'aria-labelledby': 'switch-list-label-wifi',
                                }}
                            />
                        </div>
                    </Box>
                    <Button onClick={handleSubmit} sx={{ width: '100%', backgroundColor: '#c69536', color: '#ffffff' }} variant='contained'>Submit</Button>
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



