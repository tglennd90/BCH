import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Signup = () => {
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
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" />
                            </Form.Group>
                            <Button type="submit">
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