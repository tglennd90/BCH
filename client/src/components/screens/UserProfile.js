import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Profile = () => {

    const [userProfile,setProfile] = useState(null)

    const {state,dispatch} = useContext(UserContext)

    const {userid} = useParams()

    useEffect(() => {
        
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result => {
            setProfile(result)
        })
    }, [])

    return (
        <>
        {userProfile ? 
        <div style={{maxWidth:"80%",margin:"2% auto"}}>
        <Container>
            <div className="personalArea"
                 style={{display:"flex",justifyContent:"space-around",margin:"20px 0px",paddingBottom:"2%",paddingTop:"2%",borderBottom:"2px solid black"}}>
                <div className="profilePic">
                    <img src="https://media.gettyimages.com/photos/handsome-black-man-with-a-bald-head-on-a-white-background-picture-id468465470?b=1&k=6&m=468465470&s=612x612&w=0&h=cx2AnEU362_ZC-kfsqqzCyCMrhzgIc1VlajqHQkAZrg="
                         alt="profilePic" 
                         style={{width:"205px",height:"145px",borderRadius:"50%"}}
                    />
                </div>
                <div className="profileName">
                    <h4>{userProfile.user.name}</h4>
                    <h5>{userProfile.user.email}</h5>
                    <div style={{display:"flex",justifyContent:"space-between",width:"115%"}}>
                        <h6>{userProfile.posts.length} Posts</h6>
                        <h6>Followers</h6>
                        <h6>Following</h6>
                    </div>
                </div>
            </div>
        
            <div className="galleryArea"
                 style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}
            >
                {
                    userProfile.posts.map(item => {
                        return (
                            <img className="item"
                                key={item._id}
                                src={item.photo}
                                alt={item.title}
                                style={{ width: "155px", height: "95px", borderRadius: "50%" }}
                            />
                        )
                    })
                            }
                        </div>
                    </Container>
                </div>
        : <h2>Loading...</h2>}
        
        </>
    )
}

export default Profile;