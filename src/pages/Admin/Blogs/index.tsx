import Blog from "components/Blog";
import styled from "styled-components"

const Blogs = () => {
    return (
        <Container>
            <HeaderWrap>
                <h2>Blogs Management</h2>
            </HeaderWrap>
            <BlogsWrap>
                {new Array(5).fill("*").map(el => (
                    <Blog />
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
    padding: 0 10px;
  `;

const HeaderWrap = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    flex-direction: column;
`;

const BlogsWrap = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 15px;
    width: 100%;
    margin: 15px 0 0 0;
`