import { Button } from "@mui/material";
import Blog from "components/Blog";
import styled from "styled-components"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import Backdrop from "components/Backdrop";
import NewBlog from "components/NewBlog";
import { EPS, provider } from "configs/axios";

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

interface Data {
    id: number;
    head: string;
    text: string;
    uuid: string;
    urlToS3: string;
    active: boolean;
}

const Blogs = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [blogs, setBlogs] = useState<Data[]>();

    async function loadBlogs() {
        try {
            const { data: { response } } = await provider.get(EPS.BLOGS);
            setBlogs(response);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        loadBlogs();
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <HeaderWrap>
                    <h2>Blogs Management</h2>
                    <Button
                        onClick={() => setModal(true)}
                        sx={{ maxWidth: '200px', backgroundColor: '#c69536', color: '#ffffff' }}
                        variant="contained"
                    >
                        New Blog
                    </Button>
                </HeaderWrap>
                <BlogsWrap>
                    {blogs?.map((el, index) => (
                        <Blog {...el} key={index} type="/admin" />
                    ))}
                </BlogsWrap>
            </Container>
            {modal && <Backdrop close={() => setModal(false)}>
                <NewBlog reload={loadBlogs} close={() => setModal(false)} />
            </Backdrop>}
        </ThemeProvider>
    )
}

export default Blogs

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding: 0 10px;
  `;

const HeaderWrap = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
`;

const BlogsWrap = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 15px;
    width: 100%;
    margin: 15px 0 30px 0;
`