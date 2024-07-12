import styled from 'styled-components'

const Backdrop = ({ children, close }: any) => {
    function handleContentClick(e: any) {
        e.stopPropagation();
    }
    return (
        <Container onClick={() => close()}>
            <div onClick={(e) => handleContentClick(e)}>
                {children}
            </div>
        </Container>
    )
}

export default Backdrop

const Container = styled.section`
    position: fixed;
    background-color: rgb(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 3;
    cursor: pointer;

    div {
        z-index: 6;
    }
`