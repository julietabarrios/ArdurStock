import './App.css';
import Navbar from './components/Navbar';
import Login from './containers/Login'
import Home from './containers/Home'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as jose from 'jose'

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));
  

  useEffect(
    () => {
      const verify_token = async () => {
        try {
          if (!token) {
            setIsLoggedIn(false)}
          else {
 
          axios.defaults.headers.common['Authorization'] = token;
          const response = await axios.post(`${URL}/verify_token`);
         
          return response.data.ok ? login(token) : logout();
          }
        } catch (error) {
          console.log(error);
        }
      };
      
      verify_token();
    },
    [token]
    );

  const login = (token) => {

    localStorage.setItem("token", JSON.stringify(token));
    let decodedToken = jose.decodeJwt(token)
    setUser(decodedToken)
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(()=>{
    console.log(user);
    },[])

  return (
    <Router>
    <Navbar logout={logout}/>
    <Routes>
    <Route path="/" element={<Home isLoggedIn={isLoggedIn} logout={logout} />} />
    <Route
    path="/login"
    element ={ isLoggedIn ? <Navigate to='/' /> : <Login  login={login} /> } 
    />
    </Routes>
    </Router>
  );
}

export default App;
