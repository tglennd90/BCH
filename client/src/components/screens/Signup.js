import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Signup = () => {
    const history = useHistory();

    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    
    const PostData = () => {

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({html: "Invalid Email", classes: 'red'})
            return
        }

        fetch("http://localhost:8080/signup", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.error) {
                M.toast({html: data.error, classes: 'red'})
            } else {
                M.toast({html:data.message, classes: 'green'})
                history.push('/login')
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
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                            </Form.Group>
                            <Button onClick={()=>PostData()}>
                                Sign-Up
                            </Button>
                        </Form>
                    </Card.Text>
                    <h5>
                        <Link to="/login">Already have an account?</Link>
                    </h5>
                    {/* <Card.Link href="#">Card Link</Card.Link> */}
                    {/* <Card.Link href="#">Another Link</Card.Link> */}
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Signup;