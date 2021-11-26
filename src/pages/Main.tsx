import React from 'react'
import styled from 'styled-components'
import { User } from '../App'

interface Props {
  auth: User,
  setAuth: (user: User | null) => void;
}

const Main: React.FC<Props> = ({auth, setAuth}) => {
  
  const handleLogout = () => {
    setAuth(null);
  }

  // if (!auth) {
  //   navigate('/login');
  //   return null;
  // }
  
  return (
    <Wrapper>
      <Logout onClick={handleLogout}>Logout</Logout>
      <Container>
        <Title>
        Merry Christmas <Name>{auth.name}</Name>!!
        </Title>
        <Text>You have drawn:</Text>
        <GiftWrapper>
          <Gift>{auth.gift ?? 'Coming soon...'}</Gift>
        </GiftWrapper>
      </Container>
    </Wrapper>
  )

}
export default Main;

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  padding: 2rem;
`;

const Container = styled.div`
  background-color: #FFF;
  border-radius: 3px;
  padding: 2rem;
  width: 600px;
  height: 400px;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;

  &::after {
    border: 2px solid #e92424;
    content: '';
    width: 576px;
    height: 376px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  &::before {
    border: 2px solid #16c24f;
    content: '';
    width: 556px;
    height: 356px;
    position: absolute;
    top: 20px;
    left: 20px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 1rem;
`;

const Name = styled.span`
  text-transform: capitalize;
`;

const Text = styled.p`
  color: #AAA;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 2rem;
`;

const GiftWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Gift = styled.h2`
  font-size: 5rem;
  text-transform: capitalize;
`;

const Logout = styled.p`
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 1.2rem;
  &:hover {
    text-decoration: underline;
    color: #AAA;
    cursor: pointer;
  }
`;