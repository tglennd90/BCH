import React from 'react';
import { Container } from 'react-bootstrap';

const Profile = () => {
    return (
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
                        <h4>Victor Stone</h4>
                        <div style={{display:"flex",justifyContent:"space-between",width:"115%"}}>
                            <h6>Posts</h6>
                            <h6>Followers</h6>
                            <h6>Following</h6>
                        </div>
                    </div>
                </div>
            
                <div className="galleryArea"
                     style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}
                >
                    <img src="https://media.gettyimages.com/photos/handsome-black-man-with-a-bald-head-on-a-white-background-picture-id468465470?b=1&k=6&m=468465470&s=612x612&w=0&h=cx2AnEU362_ZC-kfsqqzCyCMrhzgIc1VlajqHQkAZrg="
                             alt="profilePic" 
                             style={{width:"155px",height:"95px",borderRadius:"50%"}}
                        />
                    <img src="https://media.gettyimages.com/photos/handsome-black-man-with-a-bald-head-on-a-white-background-picture-id468465470?b=1&k=6&m=468465470&s=612x612&w=0&h=cx2AnEU362_ZC-kfsqqzCyCMrhzgIc1VlajqHQkAZrg="
                             alt="profilePic" 
                             style={{width:"155px",height:"95px",borderRadius:"50%"}}
                        />
                    <img src="https://media.gettyimages.com/photos/handsome-black-man-with-a-bald-head-on-a-white-background-picture-id468465470?b=1&k=6&m=468465470&s=612x612&w=0&h=cx2AnEU362_ZC-kfsqqzCyCMrhzgIc1VlajqHQkAZrg="
                             alt="profilePic" 
                             style={{width:"155px",height:"95px",borderRadius:"50%"}}
                        />
                    <img src="https://media.gettyimages.com/photos/handsome-black-man-with-a-bald-head-on-a-white-background-picture-id468465470?b=1&k=6&m=468465470&s=612x612&w=0&h=cx2AnEU362_ZC-kfsqqzCyCMrhzgIc1VlajqHQkAZrg="
                             alt="profilePic" 
                             style={{width:"155px",height:"95px",borderRadius:"50%"}}
                        />
                </div>
            </Container>
        </div>
    )
}

export default Profile;