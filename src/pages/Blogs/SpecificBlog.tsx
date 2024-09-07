import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from "react-router-dom";
import { EPS, provider } from 'configs/axios';
import { Button } from "@mui/material";


interface Data {
    id?: number;
    head?: string;
    text?: string;
    uuid?: string;
    urlToS3?: string;
    active?: boolean;
    file?: File;
}

const SpecificBlog = () => {
    const { uuid } = useParams();
    const [blog, setBlog] = useState<Data>();
    const navigate = useNavigate();


    async function loadBlog() {
        try {
            const { data: { response } } = await provider.get(EPS.BLOG + `/${uuid}`);
            console.log({ response })
            setBlog(response);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadBlog();
    }, [])

    return (
        <Container>
            <Image src={blog?.urlToS3} alt="blogImage" />
            <Content>
                <Header>{blog?.head}</Header>
                <Text>{blog?.text}</Text>
                <Button onClick={() => navigate(-1)} variant="contained">Go back</Button>
            </Content>
        </Container>
    )
}

export default SpecificBlog

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 70px;
    flex-direction: column;
    background-color: #000;
    height: 100vh;
    padding: 50px 0;
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
    justify-content: flex-start;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    max-width: 900px;
`
const Header = styled.h1`
    font-size: 28px;
    font-weight: 800;
    text-align: center;
    color: #fff;
`

const Text = styled.p`
    font-size: 18px;
    text-align: center;
    color: #fff;
`