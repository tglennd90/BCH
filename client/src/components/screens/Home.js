import React, { useState, useEffect } from 'react';
import { Container, Card, Form } from 'react-bootstrap';

const Home = () => {

    const [data,setData] = useState([])

    useEffect(() => {
        fetch('/allposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })
    }, [])

    return (
        <div className="homePage">
            {
                data.map(item => {
                    return(
                        <Container key={item._id}>
                            <Card>
                                <Card.Header>{item.postedBy.name}</Card.Header>
                                <Card.Body>
                                    <Card.Img src={item.photo} />
                                    <i className="fas fa-heart fa-3x"></i>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                        {item.body}
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
                    )
                })
            }
            
        </div>
    )
}

export default Home;
