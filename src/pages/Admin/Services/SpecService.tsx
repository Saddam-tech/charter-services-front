import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from "react-router-dom";
import { EPS, provider } from 'configs/axios';
import { Button, Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MESSAGES } from 'utils/messages';
import { useToasts } from 'react-toast-notifications';
import CommonAlertDialog from 'components/CommonAlertDialog';


interface Data {
    id?: number;
    head?: string;
    text?: string;
    uuid?: string;
    urlToS3?: string;
    active?: boolean;
    file?: File;
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#c69536',
        },
        secondary: {
            main: '#c6963685',
        },
    },
});

const SpecService = () => {
    const { uuid } = useParams();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [service, setService] = useState<Data>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { addToast } = useToasts();
    const navigate = useNavigate();
    const [alert, setAlert] = useState<boolean>(false);

    async function loadBlog() {
        try {
            const { data: { response } } = await provider.get(EPS.SPEC_SERVICE + `/${uuid}`);
            console.log({ response })
            setService(response);
        } catch (err) {
            console.log(err);
        }
    }

    function handleImageClickWhileEditing() {
        if (isEditing && fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setService((prev) => ({ ...prev, urlToS3: URL.createObjectURL(file), file }));
        }
    }

    async function handleEdit() {
        try {
            if (isEditing) {
                const formData = new FormData();
                for (let [key, value] of Object.entries(service || {})) {
                    if (key !== "urlToS3") {
                        formData.append(key, value);
                    }
                }
                setIsEditing(false);
                await provider.put(EPS.EDIT_SERVICE + `/${uuid}`, formData);
                loadBlog();
                addToast(MESSAGES.EDIT_COMPLETE('Service'), {
                    appearance: 'success',
                    autoDismiss: true,
                });
            } else {
                setIsEditing(true);
            }
        } catch (err) {
            addToast(MESSAGES.ERROR, {
                appearance: 'error',
                autoDismiss: true,
            });
            console.log(err);
        }
    }

    async function handleDelete() {
        try {
            await provider.delete(EPS.DELETE_SERVICE + `/${uuid}`);
            addToast(MESSAGES.DELETE_COMPLETE('Service'), {
                appearance: 'success',
                autoDismiss: true,
            });
            navigate(-1);
        } catch (err) {
            addToast(MESSAGES.ERROR, {
                appearance: 'error',
                autoDismiss: true,
            });
            console.log(err);
        }
    }

    useEffect(() => {
        loadBlog();
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Wrap>
                    <Switch onChange={() => setService(prev => ({ ...prev, active: !service?.active }))} edge="end" disabled={!isEditing} checked={service?.active} />
                    <Button onClick={handleEdit} variant="contained" color="primary">{isEditing ? "Done" : "Edit"}</Button>
                    <Button onClick={() => setAlert(true)} variant="contained" color="primary">Delete</Button>
                </Wrap>
                <>
                    <Image onClick={handleImageClickWhileEditing} src={service?.urlToS3} alt="service-image" />
                    {isEditing && <input ref={fileInputRef} id="serviceInput" type="file" name="serviceInput" onChange={handleFileChange} hidden />}
                </>
                <Content>
                    {isEditing ? <Textarea value={service?.head} onChange={(e) => setService(prev => ({ ...prev, head: e.target.value }))} placeholder="Type Header" /> : <Header>{service?.head}</Header>}
                    {isEditing ? <Textarea value={service?.text} onChange={(e) => setService(prev => ({ ...prev, text: e.target.value }))} placeholder="Type Content" /> : <Text>{service?.text}</Text>}
                </Content>
                {alert && <CommonAlertDialog header='Are you sure to delete the service?' actionBtn="Delete" open={alert} setOpen={setAlert} exec={handleDelete} />}
            </Container>
        </ThemeProvider>
    )
}

export default SpecService

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    @media screen and (max-width: 728px) {
        padding: 10px;
    }
`

const Image = styled.img`
    width: 100%;
    max-height: 500px;
    height: 100%;
    border-radius: 5px;
    max-width: 900px;
    object-fit: contain;
    cursor: pointer;
`

const Content = styled.section`
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 700px;
    height: 100%;
    max-width: 900px;
`
const Header = styled.h1`
    font-size: 28px;
    font-weight: 800;
    text-align: center;
`

const Text = styled.p`
font-size: 18px;
text-align: center;
`
const Wrap = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    gap: 10px;
    padding: 0 20px;
`
const Textarea = styled.textarea`
    width: 900px;
    height: 400px;
    background-color: rgb(255, 255, 255, 0.3);
    border: none;
    border-radius: 10px;
    padding: 10px;
    @media screen and (max-width: 728px) {
        width: 100%;
    }
`