import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    height : 60px;
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
`

const Left = styled.div`
    flex:1;
    display: flex;
`

const Search = styled.input`
    margin-left: 15px;
`

const Logo = styled.h1`
    font-weight : bold;
    font-size: 14px;
    cursor: pointer;
`

const Right = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left : 25px;
`



const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Logo>
                        Logo
                    </Logo>
                    <Search />
                </Left>
                <Right>
                    <MenuItem>Home</MenuItem>
                    <MenuItem>Profile</MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
