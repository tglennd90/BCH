import React, { useContext } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App'

const Navigation = () => {

    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()

    const renderList = () => {
        if(state) {
            return [
                <Link to="/profile">Profile</Link>,
                <Link to="/createpost">Create Post</Link>,
                <Button onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/login')
                }}>
                    Log-Out
                </Button>
            ]
        } else {
            return [
                <Link to="/login">Login</Link>,
                <Link to="/signup">Register</Link>
            ]
        }
    }

    return(
        <Navbar collapseOnSelect expand="lg">
            <Link to={state?"/":"/login"}>BootCamp Hub</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <div>
                    {renderList()}
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Navigation;