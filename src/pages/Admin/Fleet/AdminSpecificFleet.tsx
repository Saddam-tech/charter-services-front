import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom";
import { EPS, provider } from 'configs/axios';
import { Button, Input, Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


interface Data {
    model_name?: string;
    brand_name?: string;
    description?: string;
    seats?: string;
    uuid?: string;
    active?: boolean;
    type?: string;
    urlToS3?: string;
    file?: File
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

const AdminSpecificFleet = () => {
    const { uuid } = useParams();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [fleet, setFleet] = useState<Data>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    async function loadFleet() {
        try {
            const { data: { response } } = await provider.get(EPS.SPEC_FLEET + `/${uuid}`);
            console.log({ response })
            setFleet(response);
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
            setFleet((prev) => ({ ...prev, urlToS3: URL.createObjectURL(file), file }));
        }
    }

    async function handleEdit() {
        try {
            if (isEditing) {
                const formData = new FormData();
                for (let [key, value] of Object.entries(fleet || {})) {
                    if (key !== "urlToS3") {
                        formData.append(key, value);
                    }
                }
                setIsEditing(false);
                await provider.put(EPS.BLOG + `/${uuid}`, formData);
                loadFleet();
            } else {
                setIsEditing(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadFleet();
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Wrap>
                    <Switch onChange={() => setFleet(prev => ({ ...prev, active: !fleet?.active }))} edge="end" disabled={!isEditing} checked={fleet?.active} />
                    <Button onClick={handleEdit} variant="contained" color="primary">{isEditing ? "Done" : "Edit"}</Button>
                    <Button variant="contained" color="primary">Delete</Button>
                </Wrap>
                <>
                    <Image onClick={handleImageClickWhileEditing} src={fleet?.urlToS3} alt="blogImage" />
                    {isEditing && <input ref={fileInputRef} id="blogInput" type="file" name="blogInput" onChange={handleFileChange} hidden />}
                </>
                <Content>
                    {isEditing ? <BrandNameInput value={fleet?.brand_name} onChange={(e) => setFleet(prev => ({ ...prev, brand_name: e.target.value }))} placeholder="Brand Name" /> : <Header>{fleet?.brand_name}</Header>}
                    {isEditing ? <ModelNameInput value={fleet?.model_name} onChange={(e) => setFleet(prev => ({ ...prev, model_name: e.target.value }))} placeholder="Model Name" /> : <Text>{fleet?.model_name}</Text>}
                    {isEditing ? <Textarea value={fleet?.description} onChange={(e) => setFleet(prev => ({ ...prev, description: e.target.value }))} placeholder="Description" /> : <Text>{fleet?.description}</Text>}
                    {isEditing ? <Input sx={{ maxWidth: '600px', width: '100%' }} value={fleet?.seats} onChange={(e) => setFleet(prev => ({ ...prev, seats: e.target.value }))} placeholder="Seats" /> : <Text>{fleet?.seats}</Text>}
                </Content>
            </Container>
        </ThemeProvider>
    )
}

export default AdminSpecificFleet

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 20px;
    flex-direction: column;
    padding-bottom: 50px;
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
    justify-content: center;
    flex-direction: column;
    gap: 20px;
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
const BrandNameInput = styled.textarea`
    width: 600px;
    height: 70px;
    background-color: rgb(255, 255, 255, 0.3);
    border: none;
    border-radius: 10px;
    padding: 10px;
    @media screen and (max-width: 728px) {
        width: 100%;
    }
`
const ModelNameInput = styled.textarea`
    width: 600px;
    height: 70px;
    background-color: rgb(255, 255, 255, 0.3);
    border: none;
    border-radius: 10px;
    padding: 10px;
    @media screen and (max-width: 728px) {
        width: 100%;
    }
`
const Textarea = styled.textarea`
    width: 600px;
    height: 200px;
    background-color: rgb(255, 255, 255, 0.3);
    border: none;
    border-radius: 10px;
    padding: 10px;
    @media screen and (max-width: 728px) {
        width: 100%;
    }
`