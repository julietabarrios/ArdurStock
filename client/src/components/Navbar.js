import {useNavigate} from 'react-router-dom'

function Navbar({logout}) {
    const navigate=useNavigate()
    const handleLogOut =()=>{
        logout()
        navigate('/')
     }
  
    return (
      <>
      <h2>Ardur</h2>
      <h3>Productos</h3>
      <h3>Posiciones</h3>
      <button onClick={handleLogOut}>Cerrar sesión</button>
      </>
    )
    
  }
  
  export default Navbar