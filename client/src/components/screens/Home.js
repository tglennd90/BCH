import React from 'react';
import { Container, Card, Form } from 'react-bootstrap';

const Home = () => {
    return (
        <div className="homePage">
            <Container>
                <Card>
                    <Card.Header>User Name</Card.Header>
                    <Card.Body>
                        <Card.Img style={{height:"300px"}} variant="top" src="https://www.pixelstalk.net/wp-content/uploads/2016/04/Earth-backgrounds-free-download.jpg" />
                        <i className="fas fa-heart fa-3x"></i>
                        <Card.Title>Post Title</Card.Title>
                        <Card.Text>
                            Post Body
                        </Card.Text>
                        <Form>
                            <Form.Group controlId="formBasicText">
                                <Form.Label>Comment Here</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Home;
