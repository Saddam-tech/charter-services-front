import CustomTable from 'components/CustomTable'
import styled from 'styled-components'

const Orders = () => {
    return (
        <Container>
            <HeaderWrap>
                <h2>Incoming Orders</h2>
                <p>Orders are fetched each 5 seconds</p>
                <TableWrap>
                    <CustomTable />
                </TableWrap>
            </HeaderWrap>
        </Container>
    )
}

export default Orders

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const HeaderWrap = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    flex-direction: column;
`

const TableWrap = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 80em;
    width: 100%;
`