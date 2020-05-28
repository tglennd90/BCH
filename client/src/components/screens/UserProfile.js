import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const UserProfile = () => {

    const [userProfile,setProfile] = useState(null)

    const {state,dispatch} = useContext(UserContext)

    const {userid} = useParams()

    const [showfollow,setShowFollow] = useState(state ? !state.following.includes(userid) : true)

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

    const followUser = () => {
        fetch('/follow',{
            method: "put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:`${userid}`
            })
        })
        .then(res=>res.json())
        .then(data => {
            // console.log(data)
            dispatch({type:"UPDATE",payload:{
                following:data.following,
                followers:data.followers
            }})

            localStorage.setItem("user",JSON.stringify(data))

            setProfile((prevState) => {
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[
                            ...prevState.user.followers,data._id
                        ]
                    }
                }
            })

            setShowFollow(false)
        })
    }

    const unfollowUser = () => {
        fetch('/unfollow',{
            method: "put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        })
        .then(res=>res.json())
        .then(data => {
            // console.log(data)
            dispatch({type:"UPDATE",payload:{
                following:data.following,
                followers:data.followers
            }})

            localStorage.setItem("user",JSON.stringify(data))

            setProfile((prevState) => {

                const newFollower = prevState.user.followers.filter(item => item != data._id)

                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })

            setShowFollow(true)
        })
    }

    return (
        <>
        {userProfile ? 
        <div style={{maxWidth:"80%",margin:"2% auto"}}>
        <Container>
            <div className="personalArea"
                 style={{display:"flex",justifyContent:"space-around",margin:"20px 0px",paddingBottom:"2%",paddingTop:"2%",borderBottom:"2px solid black"}}>
                <div className="profilePic">
                    <img src={userProfile.user.photo}
                         alt="profilePic" 
                         style={{width:"205px",height:"145px",borderRadius:"50%"}}
                    />
                </div>
                <div className="profileName">
                    <h4>{userProfile.user.name}</h4>
                    <h5>{userProfile.user.email}</h5>
                    <div style={{display:"flex",justifyContent:"space-between",width:"115%"}}>
                        <h6>{userProfile.posts.length} Posts</h6>
                        <h6>{userProfile.user.followers.length} Followers</h6>
                        <h6>Following {userProfile.user.following.length}</h6>
                    </div>
                    {
                        showfollow 
                        ?
                        <Button onClick={()=>followUser()}>
                            Follow
                        </Button>
                        :
                        <Button onClick={()=>unfollowUser()}>
                            Un-Follow
                        </Button>
                    }
                    
                    
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

export default UserProfile;