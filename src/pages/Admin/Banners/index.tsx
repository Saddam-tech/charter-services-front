import DataTable from 'components/DataTable'
import styled from 'styled-components'

const Banners = () => {
    return (
        <Container>
            <HeaderWrap>
                <h2>Banner Management</h2>
            </HeaderWrap>
            <DataTable />
        </Container>
    )
}

export default Banners

const Container = styled.section`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`;

const HeaderWrap = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    flex-direction: column;
`;
