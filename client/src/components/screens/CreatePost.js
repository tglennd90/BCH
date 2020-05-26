import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

const CreatePost = () => {
    return (
        <div>
            <Container>
                <Card>
                    <Container>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text" size="lg" placeholder="Title" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as="textarea" rows="3" placeholder="Body" />
                        </Form.Group>
                        <div className="mb-3">
                            <Form.File id="formcheck-api-regular">
                                <Form.File.Label>Image</Form.File.Label>
                                <Form.File.Input />
                            </Form.File>
                        </div>
                        <Button>
                                Submit Post
                        </Button>
                    </Form>
                    </Container>
                </Card>
            </Container>
        </div>
    )
};

export default CreatePost;