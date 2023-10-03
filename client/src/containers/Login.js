import React, {useState} from 'react'
import axios from "axios";
import {URL} from '../../src/config'
import {useNavigate} from 'react-router-dom'
import * as jose from 'jose'


function Login(props) {
    const [data, setData] = useState({
        email: "",
        password: "",
      });
    
      const navigate = useNavigate()
    
      const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.reset()
        try {
          const response = await axios.post(`${URL}/login`, {
            email: data.email.toLowerCase(),
            password: data.password,
          });
          if (response.data.ok) { 
            let decodedToken = jose.decodeJwt(response.data.token)
            console.log("Email extracted from the JWT token after login: ", decodedToken.userEmail)
            setTimeout(() => {
              props.login(response.data.token);
              navigate("/");
            }, 2000);
          }
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <section>
          <form
            onSubmit={handleSubmit}
            onChange={handleChange}
          >
            <label>Email</label>
            <input name="email" />
            <label>Contraseña</label>
            <input type='password' name="password" />
            <button>Ingresar</button>
          </form>
        </section>
        );
}

export default Login