import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Home({isLoggedIn}) {
    return (
        <div className='home'>
        { !isLoggedIn ? 
        <section><NavLink to="/login">Login</NavLink></section >: 
       <>
       <section><Navbar/></section>
       </>
        }
        </div>
          )
}

export default Home