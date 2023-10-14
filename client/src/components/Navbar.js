import {useNavigate} from 'react-router-dom'

function Navbar({logout, isLoggedIn}) {
    const navigate=useNavigate()
    const handleLogOut =()=>{
        logout()
        navigate('/')
     }
  
    return (
      <>
      {isLoggedIn &&
      <>
      <h2>Ardur</h2>
      <h3>Productos</h3>
      <h3>Posiciones</h3>
      <button onClick={handleLogOut}>Cerrar sesión</button>
      </>
      }
      </>
    )
    
  }
  
  export default Navbar