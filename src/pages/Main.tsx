import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import styled from 'styled-components'
import { ME_QUERY } from '../graphql/queries/me'
import { useNavigate } from 'react-router-dom'
import { LOGOUT_MUTATION } from '../graphql/mutations/logout'

const Main = () => {

  const navigate = useNavigate();
  const {data, loading, refetch}  = useQuery(ME_QUERY);

  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted() {
      refetch();
    }
  });
  
  const handleLogout = () => {
    logout();
  }

  if (loading) return <h1>LOADING</h1>

  if (data && !data?.meXmas) {
    navigate('/login');
    return null;
  }
  
  return (
    <Wrapper>
      <Logout onClick={handleLogout}>Logout</Logout>
      <Container>
        <Title>
        Merry Christmas <Name>{data.meXmas.name}</Name>!!
        </Title>
        <Text>You have drawn:</Text>
        <GiftWrapper>
          <Gift>{data.meXmas.gift?.name ?? 'Coming soon...'}</Gift>
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
    border: 2px solid #13b754;
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