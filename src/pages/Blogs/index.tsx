import Blog from "components/Blog";
import { EPS, provider } from "configs/axios";
import { useEffect, useState } from "react";
import styled from "styled-components"

interface Data {
    id: number;
    head: string;
    text: string;
    uuid: string;
    urlToS3: string;
    active: number;
}

const Blogs = () => {
    const [blogs, setBlogs] = useState<Data[]>();

    async function loadBlogs() {
        try {
            const { data: { response } } = await provider.get(EPS.BLOGS);
            const filtered = response.filter((el: Data) => el.active == 1);
            setBlogs(filtered);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadBlogs();
    }, []);
    return (
        <Container>
            <HeaderWrap>
                <h2>Blogs</h2>
            </HeaderWrap>
            <BlogsWrap>
                {blogs?.map((el, index) => (
                    <Blog {...el} key={index} type='' />
                ))}
            </BlogsWrap>
        </Container>
    )
}

export default Blogs

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    padding: 0 10px;
    background: #000000;
  `;

const HeaderWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    color: #ffffff;
`;

const BlogsWrap = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    width: 100%;
    margin: 15px 0 30px 0;
    height: 100%;

`