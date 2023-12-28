import styled from 'styled-components';

interface IBlogs {
    h1: string;
    text: string;
    img: string;
}

const ServicesBlog = ({ h1, text, img }: IBlogs) => {
    return (
        <Container>
            <section className="text-holder">
                <h2>{h1}</h2>
                <p>{text}</p>
            </section>
            <img src={require(`assets/${img}`)} alt="service-img" />
        </Container>
    )
}

export default ServicesBlog

const Container = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    margin: 50px 0;

    .text-holder {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap: 10px;
        flex-direction: column;
        max-width: 600px;
        width: 100%;
        color: #ffffff;
    }
    img {
        width: 100%;
        max-width: 500px;
    }
`;