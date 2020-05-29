import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';
import { Container, Button, Form } from 'react-bootstrap';
import './css/Profile.css';

const Profile = () => {

    const [mypics,setPics] = useState([])
    const [image,setImage] = useState("")

    const {state,dispatch} = useContext(UserContext)

    useEffect(() => {
        fetch('/myposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result => {
            console.log(result)
            setPics(result.myposts)
        })
    }, [])

    useEffect(() => {
        if(image){

            const data = new FormData()

            data.append("file",image)
            data.append("upload_preset","sm-clone")
            data.append("cloud_name","tgdcloud9019")

            fetch("https://api.cloudinary.com/v1_1/tgdcloud9019/image/upload",{
                method: "post",
                body: data
            })
            .then(res=>res.json())
            .then(data=>{
        
               fetch('/updatephoto',{
                   method:"put",
                   headers:{
                       "Content-Type": "application/json",
                       "Authorization": "Bearer "+localStorage.getItem("jwt")
                   },
                   body:JSON.stringify({
                       photo:data.url
                   })
               })
               .then(res=>res.json())
               .then(result=>{
                   console.log(result)
                   localStorage.setItem("user",JSON.stringify({...state,photo:result.photo}))
                   dispatch({type:"UPDATEPHOTO",payload:result.photo})
               })
            })
            .catch(err=>{console.log(err)})

        }
    }, [image])

    const updatePhoto = (file) => {
        setImage(file)
    }

    return (
        <div className="personalArea" style={{maxWidth:"80%",margin:"2% auto"}}>
            <Container>
                <div 
                     style={{display:"flex",justifyContent:"space-around",margin:"20px 0px",paddingBottom:"2%",paddingTop:"2%",borderBottom:"2px solid #ffce3f"}}>
                    <div className="profilePic">
                        <img src={state ? state.photo : "Loading..."}
                             alt="profilePic" 
                        />
                    </div>
                    <div>
                        <div className="mb-3">
                            <Form.File id="formcheck-api-regular">
                                <Form.File.Label>Update Photo</Form.File.Label>
                                <Form.File.Input  type="file" 
                                    onChange={(e)=>updatePhoto(e.target.files[0])}/>
                            </Form.File>
                        </div>
                    </div>
                    <div className="profileName">
                        <h4>{state ? state.name : "Loading.."}</h4>
                        <h5>{state ? state.email : "Loading.."}</h5>
                        <div className="profileStats" style={{display:"flex",justifyContent:"space-between",width:"115%"}}>
                            <h6>{mypics.length} Posts</h6>
                            <h6>{state ? state.followers.length : "Loading.."} Followers</h6>
                            <h6>Following {state? state.following.length : "Loading.."}</h6>
                        </div>
                    </div>
                </div>
            
                <div className="galleryArea"
                     style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}
                >
                    {
                        mypics.map(item => {
                            return (
                                <img className="item"
                                    key={item._id}
                                    src={item.photo}
                                    alt={item.title} 
                                />
                            )
                        })
                    }
                </div>
            </Container>
        </div>
    )
}

export default Profile;