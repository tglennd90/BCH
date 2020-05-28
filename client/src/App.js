import React, { useEffect, createContext, useReducer, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { reducer, initialState } from './reducers/userReducer';

import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import Navigation from './components/Navbar';
import UserProfile from './components/screens/UserProfile';
import FollowedHome from './components/screens/FollowedUserPosts';

export const UserContext = createContext()

const Routing = () => {

    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user)
        if(user) {
            dispatch({type:"USER",payload:user})
            // history.push('/')


        } else {
            history.push('/login')
        }
    },[])

    return (
        <Switch>
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
            <Route exact path="/profile">
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
            <Route path="/profile/:userid">
                <Container>
                    <UserProfile />
                </Container>
            </Route>
            <Route path="/followedusersposts">
                <Container>
                    <FollowedHome />
                </Container>
            </Route>
        </Switch>
    )
}

function App() {

    const [state,dispatch] = useReducer(reducer,initialState)
    
    return (
        <UserContext.Provider value={{state,dispatch}}>
            <BrowserRouter>
                <Navigation />
                <Routing />
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App;
