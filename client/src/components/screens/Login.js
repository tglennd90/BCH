import React, { useState, useContext } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App'
import M from 'materialize-css';

const Login = () => {

    const {state,dispatch} = useContext(UserContext)

    const history = useHistory();

    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    
    const PostData = () => {

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({html: "Invalid Email", classes: 'red'})
            return
        }

        fetch("/signin", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if (data.error) {
                M.toast({html: data.error, classes: 'red'})
            } else {
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Logged In!", classes: 'green'})
                history.push('/')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>BootCamp Hub</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Login</Card.Subtitle>
                    <Card.Text>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                            </Form.Group>
                            <Button onClick={()=>PostData()}>
                                Log-In
                            </Button>
                        </Form>
                    </Card.Text>
                    <h5>
                        <Link to="/signup">Don't have an account yet?</Link>
                    </h5>
                    {/* <Card.Link href="#">Card Link</Card.Link> */}
                    {/* <Card.Link href="#">Another Link</Card.Link> */}
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login;