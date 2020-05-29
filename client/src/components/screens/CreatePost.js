import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';
import './css/CreatePost.css';

const CreatePost = () => {

    const history = useHistory()

    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")

    useEffect(() => {

        if (url) {
        
            fetch("/createpost", {
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    pic:url
                })
            })
            .then(res=>res.json())
            .then(data=>{
                if (data.error) {
                    M.toast({html: data.error, classes: 'red'})
                } else {
                    M.toast({html:"Post Created!", classes: 'green'})
                    history.push('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [url])

    const postDetails = () => {
        const formData = new FormData()

        formData.append("file",image)
        formData.append("upload_preset","sm-clone")
        formData.append("cloud_name","tgdcloud9019")

        fetch("https://api.cloudinary.com/v1_1/tgdcloud9019/image/upload", {
            method: "post",
            body: formData
        })
        .then(res=>res.json())
        .then(data=>setUrl(data.url))
        .catch(err=>{console.log(err)})
    }

    return (
        <div>
            <Container>
                <div className="pageTitle">
                    <h1>Create a Post!</h1>
                </div>
                <Card className="mainCard">
                    <Container>
                    <Form>
                        <Form.Group style={{marginBottom:"3%"}}>
                        <Form.Label className="labelTitle" style={{transform:"translateY(80px)"}}>Title</Form.Label>
                            <Form.Control type="text" size="lg" style={{backgroundColor:"#06304b",border:"none",borderBottom:"2px solid #ffce3f",color:"#ffce3f"}}
                                value={title} onChange={(e)=>setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group style={{marginBottom:"3%"}} >
                        <Form.Label style={{transform:"translateY(112px"}}>Details</Form.Label>
                            <Form.Control  style={{backgroundColor:"#06304b",border:"none",borderBottom:"2px solid #ffce3f",color:"#ffce3f",resize:"none"}} as="textarea" rows="3"
                                value={body} onChange={(e)=>setBody(e.target.value)} />
                        </Form.Group>
                        <div className="mb-3" style={{marginTop:"7%"}}>
                            <Form.File id="formcheck-api-regular">
                                <Form.File.Label>Image</Form.File.Label>
                                <Form.File.Input type="file" 
                                    onChange={(e)=>setImage(e.target.files[0])}/>
                            </Form.File>
                        </div>
                        <Button style={{marginTop:"-5%"}} onClick={()=>postDetails()}>
                                Post!
                        </Button>
                    </Form>
                    </Container>
                </Card>
            </Container>
        </div>
    )
};

export default CreatePost;