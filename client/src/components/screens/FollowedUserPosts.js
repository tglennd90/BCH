import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App'
import { Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './css/Followed.css';

const FollowedHome = () => {

    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)

    useEffect(() => {
        fetch('/getfollowedposts',{
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

    const makeComment = (text,postId) => {
        fetch('/comment',{
            method: "put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        })
        .then(res=>res.json())
        .then(result => {
            console.log(result)

            const newData = data.map(item => {
                if(item._id==result._id) {
                    return result
                } else {
                    return item
                }
            })
            
            setData(newData)
        })
        .catch(err=>{console.log(err)})
    }

    const deletePost = (postId) => {
        fetch(`/deletepost/${postId}`, {
            method: "delete",
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result => {
            console.log(result)

            const newData = data.filter(item => {
                return item._id !== result._id
            })

            setData(newData)
        })
        .catch(err=>{console.log(err)})
    }

    // const deleteComment = (commentId) => {
    //     fetch(`/deletecomment/${commentId}`, {
    //         method: "delete",
    //         headers: {
    //             "Authorization":"Bearer "+localStorage.getItem("jwt")
    //         }
    //     })
    //     .then(res=>res.json())
    //     .then(result => {

    //         const newData = data.filter(item => {
    //             return item._id !== result._id
    //         })

    //         setData(newData)
    //     })
    //     .catch(err=>{console.log(err)})
    // }
    
    return (
        <div className="homePage">
            {
                data.map(item => {
                    return(
                        <Container key={item._id}>
                            <Card className="homeCard">
                                <Card.Header className="cardHeader">
                                <div>Posted By: <Link to={item.postedBy._id !== state.id ? "/profile/"+item.postedBy._id : "/profile" }>{item.postedBy.name}</Link></div>
                                    {item.postedBy._id == state._id && <i className="fas fa-trash-alt fa-lg" style={{float:"right"}} onClick={()=>deletePost(item._id)}></i>}
                                </Card.Header>
                                <Card.Body>
                                    <Card.Img src={item.photo} />
                                    {/* <i className="fas fa-heart fa-3x"></i> */}
                                    {item.likes.includes(state._id)
                                    ?<i className="fas fa-thumbs-down fa-3x" style={{color:"#CD212A"}} onClick={()=>unlikePost(item._id)}></i>
                                    :<i className="fas fa-thumbs-up fa-3x" onClick={()=>likePost(item._id)}></i>
                                    }
                                    <Card.Title>{item.likes.length} Like(s)</Card.Title>
                                    <Card.Text>
                                        Title: {item.title}
                                        <br></br>
                                        Description: {item.body}
                                        {
                                            item.comments.map(record=>{
                                                return(
                                                    <div key={record._id}>
                                                        Comments:
                                                    <h6><span>{record.postedBy.name}:</span> {record.text}</h6>
                                                    {/* {record.postedBy._id == state._id && <i className="fas fa-trash-alt fa-lg" 
                                                    onClick={()=>deleteComment(record._id)}></i>} */}
                                                    </div>
                                                )
                                            })
                                        }
                                    </Card.Text>
                                    <Form onSubmit={(e)=>{
                                            e.preventDefault()
                                            makeComment(e.target[0].value,item._id)    
                                    }}>
                                        <Form.Group controlId="formBasicText">
                                            <Form.Label style={{transform:"translateY(80px)"}}>Comment Here</Form.Label>
                                            <Form.Control style={{borderBottom:"2px solid #008C45",color:"#CD212A"}} type="text" />
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

export default FollowedHome;
