import CustomTable from 'components/CustomTable'
import styled from 'styled-components'
import { useParams } from "react-router-dom";

const Orders = () => {
    const { path } = useParams();
    return (
        <Container>
            <HeaderWrap>
                <h2>{path && path[0].toUpperCase() + path?.slice(1)} Orders</h2>
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
    padding: 0 10px;
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
    padding: 0 30px 0 0;
`