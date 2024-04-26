import styled from 'styled-components'

const Backdrop = ({ children, close }: any) => {
    return (
        <Container onClick={() => close()}>
            {children}
        </Container>
    )
}

export default Backdrop

const Container = styled.section`
    position: absolute;
    background-color: rgb(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 3;
    cursor: pointer;
`