import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import {BrowserRouter,Route} from 'react-router-dom';

import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';

import Navigation from './components/Navbar';

function App() {

    
    
    return (
        <BrowserRouter>
            <Navigation />
            <Route exact path="/">
                <Container>
                    <Home />
                </Container>
            </Route>
            <Route path="/login">
                <Container>
                    <Login />
                </Container>
            </Route>
            <Route path="/profile">
                <Container>
                    <Profile />
                </Container>
            </Route>
            <Route path="/signup">
                <Container>
                    <Signup />
                </Container>
            </Route>
            <Route path="/createpost">
                <Container>
                    <CreatePost />
                </Container>
            </Route>
        </BrowserRouter>
    )
}

export default App;
