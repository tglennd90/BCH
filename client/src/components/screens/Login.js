import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
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
                                <Form.Control type="email" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" />
                            </Form.Group>
                            <Button type="submit">
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