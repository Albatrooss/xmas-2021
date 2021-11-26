import React, { FormEvent, useState } from 'react'
import styled from 'styled-components'
import { Button, Form, Input, message, Typography } from 'antd';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations/login';
import { User } from '../App';
import { useNavigate } from 'react-router';

interface FormType {
  name: string;
  password: string;
}

interface Props {
  setAuth: (user: User) => void;
}

const Login: React.FC<Props> = ({ setAuth }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormType>({
    name: '', password: ''
  });
  const [invalidFields, setInvalidFields] = useState<FormType>({
    name: '', password: ''
  })

  const [login] = useMutation(LOGIN_MUTATION);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      variables: {
        name: formData.name,
        password: formData.password,
      },
      onCompleted({ loginXmas: { errors, user }}) {
        console.log('errors', errors)
        if (errors && errors.length) {
          const error = errors[0];
          setInvalidFields(prev => ({
            ...prev,
            [error.field]: error.message
          }))
          return;
        }
        if (user.name) {
          setAuth({
            name: user.name,
            gift: user.gift.name
          })
          navigate('/');
        }
      },
      onError(err) {
        message.error(err.message)
      }
    })
  }

  const getInvalidFields = (key: keyof FormType) => invalidFields[key]
    ? {
      help: invalidFields[key],
      validateStatus: 'error',
    } as {help: string; validateStatus: 'error'}
    : {}

  return (
    <main>
      <StyledForm onSubmitCapture={handleLogin}>
        <Title>Login</Title>
        <Item labelCol={{span: 4}} label='Name' {...getInvalidFields('name')}>
          <Input value={formData.name} onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}/>
        </Item>
        <Item labelCol={{span: 4}} label='Password' {...getInvalidFields('password')} >
          <Input.Password value={formData.password} onChange={e => setFormData(prev => ({...prev, password: e.target.value}))}/>
        </Item>
        <Button type='primary' htmlType='submit'>Login</Button>
      </StyledForm>
    </main>
  )

}
export default Login;

const StyledForm = styled(Form)`
  width: 600px;
  background-color:white;
  margin-top: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Item = styled(Form.Item)`
  width: 100%;
`;

const Title = styled(Typography.Title)`
  text-align: center;
`;