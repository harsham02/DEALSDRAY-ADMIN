import React from 'react'
import './navBar.css'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    }
  return (
    <div>
        <header>
            <h1>DEALSDRAY</h1>
        </header>
        <hr />
        <div className='navbar'>
        <h3 className='navbar-title'>Home</h3>
        <h3 className='navbar-title'>Employee List</h3>
            <div className="toggle-container">
                <select className='select-box'>
                    <option value="admin">harsha</option>
                </select>
            <button onClick={handleLogout}>Logout</button>
            </div>
            </div>
        </div>
  )
}

export default NavBar
