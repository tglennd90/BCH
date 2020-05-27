import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App'
import { Container, Card, Form } from 'react-bootstrap';

const Home = () => {

    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)

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

    const likePost = (id) => {
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        })
        .then(res=>res.json())
        .then(result => {
            const newData = data.map(item => {
                if(item._id==result._id) {
                    return result
                } else {
                    return item
                }
            })

            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const unlikePost = (id) => {
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        })
        .then(res=>res.json())
        .then(result => {
            const newData = data.map(item => {
                if(item._id==result._id) {
                    return result
                } else {
                    return item
                }
            })

            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }

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
                                    {item.likes.includes(state._id)
                                    ?<i className="fas fa-thumbs-down fa-3x" onClick={()=>unlikePost(item._id)}></i>
                                    :<i className="fas fa-thumbs-up fa-3x" onClick={()=>likePost(item._id)}></i>
                                    }
                                    <Card.Title>{item.likes.length} Like(s)</Card.Title>
                                    <Card.Text>
                                        {item.title}
                                        <br></br>
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
