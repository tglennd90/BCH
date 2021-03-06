import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import './css/Signup.css';

const Signup = () => {
    const history = useHistory();

    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)

    useEffect(() => {
        if(url) {
            uploadFields()
        }
    },[url])

    const uploadPic = () => {
        const data = new FormData()

        data.append("file",image)
        data.append("upload_preset","sm-clone")
        data.append("cloud_name","tgdcloud9019")

        fetch("https://api.cloudinary.com/v1_1/tgdcloud9019/image/upload", {
            method: "post",
            body: data
        })
        .then(res=>res.json())
        .then(data=>setUrl(data.url))
        .catch(err=>{console.log(err)})
    }

    const uploadFields = () => {

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
                email,
                photo:url
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
    
    const PostData = () => {

        if (image) {
            uploadPic()
        } else {
            uploadFields()
        }

    }

    return (
        <Container>
            <Card className="signupCard">
                <Card.Body>
                    <Card.Title style={{marginBottom:"1%",float:"right"}}><h4>Margatsni Registration</h4></Card.Title>
                    <Card.Text>
                        <Form>
                            <Form.Group controlId="formBasicText">
                                <Form.Label style={{transform:"translateY(90px",color:"#F4F5F0"}}>Name</Form.Label>
                                <Form.Control style={{color:"#F4F5F0",borderBottom:"2px solid #CD212A"}} type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label style={{transform:"translateY(80px",color:"#F4F5F0"}}>Email address</Form.Label>
                                <Form.Control style={{color:"#F4F5F0",borderBottom:"2px solid #CD212A"}} type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label style={{transform:"translateY(80px", color:"#F4F5F0"}}>Password</Form.Label>
                                <Form.Control style={{color:"#F4F5F0",borderBottom:"2px solid #CD212A"}}type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                            </Form.Group>
                            <div className="mb-3" style={{marginTop:"7%",color:"#F4F5F0"}}>
                                <Form.File id="formcheck-api-regular">
                                    <Form.File.Label>Upload Picture</Form.File.Label>
                                    <Form.File.Input type="file" 
                                        onChange={(e)=>setImage(e.target.files[0])}/>
                                </Form.File>
                            </div>
                            <Button onClick={()=>PostData()}>
                                Sign-Up
                            </Button>
                        </Form>
                    </Card.Text>
                    <h5 className="alt2" >
                        <Link to="/login">Already registered?</Link>
                    </h5>
                    {/* <Card.Link href="#">Card Link</Card.Link> */}
                    {/* <Card.Link href="#">Another Link</Card.Link> */}
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Signup;