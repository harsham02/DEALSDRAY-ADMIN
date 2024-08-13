import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const Login = () => {

    const [username, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!username || !password) {
        toast({
          title: "Please fill all fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        console.log('Fill all details');
        return;
      }
    
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
    
      axios
        .post('https://dealsdray-admin.onrender.com/api/login', { username, password }, config)
        .then((response) => {
          const data = response.data;
          console.log('Login response:', data);
          toast({
            title: "login successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top" });
          navigate('/dashboard');
        })
        .catch((error) => {
          console.error('Login error:', error);
          toast({
            title: "Invalid login details",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        });
    };
    
  return (
    <div>
      <h1>DEALSDRAY</h1>

      <div className="login">
        <h2>Login</h2>
        
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>User Name</label>
          <input 
            type="text" 
            name='username'
            id='username'
            value={username}
            placeholder="username"
            onChange={(e) => setuserName(e.target.value)}
            autoComplete="username" 
          />

          <label htmlFor='password'>Password</label>
          <input 
            type="password"
            name='password'
            id='password'
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password" 
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
