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
    active: boolean;
    head: string;
    text: string;
}


const NewBlog = ({ reload, close }: { reload: () => void; close: () => void }) => {
    const [data, setData] = useState<data>({ file: null, active: true, head: "", text: "" });
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
            formData.append('file', data.file);
            formData.append('active', data.active ? '1' : '0');
            formData.append('head', data.head);
            formData.append('text', data.text);
            setLoader(true);
            await provider.post(EPS.NEW_BLOG, formData);
            setLoader(false);
            addToast(MESSAGES.UPLOAD_COMPLETE('Blog'), {
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
                <p>New Blog</p>
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
                            <label htmlFor="bannerInput">Select Blog Image</label>
                            <input id="bannerInput" type="file" name="imageInput" onChange={handleFileChange} />
                        </div>
                        <TextField
                            onChange={(event) => setData(prev => ({ ...prev, head: event.target.value }))}
                            // helperText={errorState.dropoff_location_error && "This field is required!"}
                            // error={errorState.dropoff_location_error}
                            sx={{ margin: '10px 0 0 0' }}
                            type="text"
                            fullWidth
                            id="header-input"
                            label="Header"
                        />
                        <TextField
                            onChange={(event) => setData(prev => ({ ...prev, text: event.target.value }))}
                            // helperText={errorState.dropoff_location_error && "This field is required!"}
                            // error={errorState.dropoff_location_error}
                            sx={{ margin: '10px 0 0 0' }}
                            type="text"
                            fullWidth
                            id="content-input"
                            label="Content"
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

export default NewBlog

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



