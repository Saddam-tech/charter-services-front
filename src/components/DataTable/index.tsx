import styled from 'styled-components'

const DataTable = () => {
    return (
        <Container>
            {/* header */}
            <Header>
                <li>Image</li>
                <li>Heading</li>
                <li>Link</li>
                <li>Priority</li>
            </Header>
            {/* header */}

            {/* list */}
            <List>
                <li>
                    <img src="" alt="" />
                    <p>Heading Heading Heading Heading</p>
                    <a href="https://linktothes3bucket.com">ImageLink</a>
                    <select name="priority" id="priority">
                        <option value="">empty</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </li>
            </List>
            {/* list */}
        </Container>
    )
}

export default DataTable

const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Header = styled.ul`
    
`
const List = styled.ul`
    
`