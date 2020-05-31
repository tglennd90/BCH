import React, { useContext } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App'
import './Navbar.css'

const Navigation = () => {

    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()

    const renderList = () => {
        if(state) {
            return [
                <Link to="/profile" key="3">Profile</Link>,
                <Link to="/createpost" key="4">Create Post</Link>,
                <Link to="/followedusersposts" key="6">Following</Link>,
                <Button className="navBtn" key="5" onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/login')
                }}>
                    Log-Out
                </Button>
            ]
        } else {
            return [
                <Link to="/login" key="1">Login</Link>,
                <Link to="/signup" key="2">Register</Link>
            ]
        }
    }

    return(
        <Navbar collapseOnSelect expand="lg" sticky="top" className="navBar">
            <Link className="navLogo" to={state?"/":"/login"}>Margatsni</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <div className="navList">
                    {renderList()}
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Navigation;