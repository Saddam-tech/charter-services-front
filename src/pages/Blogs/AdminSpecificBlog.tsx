import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from "react-router-dom";
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

const AdminSpecificBlog = () => {
    const { uuid } = useParams();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [blog, setBlog] = useState<Data>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { addToast } = useToasts();
    const navigate = useNavigate();
    const [alert, setAlert] = useState<boolean>(false);

    async function loadBlog() {
        try {
            const { data: { response } } = await provider.get(EPS.BLOG + `/${uuid}`);
            console.log({ response })
            setBlog(response);
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
            setBlog((prev) => ({ ...prev, urlToS3: URL.createObjectURL(file), file }));
        }
    }

    async function handleEdit() {
        try {
            if (isEditing) {
                const formData = new FormData();
                for (let [key, value] of Object.entries(blog || {})) {
                    if (key !== "urlToS3") {
                        formData.append(key, value);
                    }
                }
                setIsEditing(false);
                await provider.put(EPS.BLOG + `/${uuid}`, formData);
                loadBlog();
                addToast(MESSAGES.EDIT_COMPLETE('Blog'), {
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
            await provider.delete(EPS.BLOG + `/${uuid}`);
            addToast(MESSAGES.DELETE_COMPLETE('Blog'), {
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
                    <Switch onChange={() => setBlog(prev => ({ ...prev, active: !blog?.active }))} edge="end" disabled={!isEditing} checked={blog?.active} />
                    <Button onClick={handleEdit} variant="contained" color="primary">{isEditing ? "Done" : "Edit"}</Button>
                    <Button onClick={() => setAlert(true)} variant="contained" color="primary">Delete</Button>
                </Wrap>
                <>
                    <Image onClick={handleImageClickWhileEditing} src={blog?.urlToS3} alt="blogImage" />
                    {isEditing && <input ref={fileInputRef} id="blogInput" type="file" name="blogInput" onChange={handleFileChange} hidden />}
                </>
                <Content>
                    {isEditing ? <Textarea value={blog?.head} onChange={(e) => setBlog(prev => ({ ...prev, head: e.target.value }))} placeholder="Type Header" /> : <Header>{blog?.head}</Header>}
                    {isEditing ? <Textarea value={blog?.text} onChange={(e) => setBlog(prev => ({ ...prev, text: e.target.value }))} placeholder="Type Content" /> : <Text>{blog?.text}</Text>}
                </Content>
            </Container>
            {alert && <CommonAlertDialog header='Are you sure to delete the blog?' actionBtn="Delete" open={alert} setOpen={setAlert} exec={handleDelete} />}
        </ThemeProvider >
    )
}

export default AdminSpecificBlog

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 20px;
    flex-direction: column;
    @media screen and (max-width: 728px) {
        width: 100%;
        padding: 20px;
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
    gap: 10px;
    max-width: 700px;
    width: 100%;
    height: 100vh;
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
    width: 100%;
    height: 400px;
    background-color: rgb(255, 255, 255, 0.3);
    border: none;
    border-radius: 10px;
    padding: 10px;
    @media screen and (max-width: 728px) {
        width: 100%;
    }
`