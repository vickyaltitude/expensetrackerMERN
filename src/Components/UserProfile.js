import React,{useState,useEffect} from 'react';
import { Container, Row, Col, Card, Image,Button } from 'react-bootstrap';
import apiHandler from '../apihandler';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {


    const navigate = useNavigate();
    
    const [userProfile,setUserProfile] = useState({
        userFullName: '',
        userProfilePicUrl: ''
    })

    useEffect(()=>{

        apiHandler('http://localhost:5000/user/getuserprofile',{
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization' : localStorage.getItem('userAUTHID')
            }
        }).then(resp =>{
            setUserProfile({userProfilePicUrl: resp.data[0].userProfilePicUrl,userFullName: resp.data[0].userFullName })
            console.log(resp)
        }).catch(err => console.log(err))


    },[])

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", width: "100%" }}
    >
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="shadow-lg">
            <Card.Body className="text-center">
        
              <Image
                src={userProfile.userProfilePicUrl}
                alt="Profile Picture"
                roundedCircle
                fluid
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  marginBottom: "20px",
                }}
              />
      
              <Card.Title style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                {userProfile.userFullName}
              </Card.Title>
              <Button onClick={()=> navigate('/profileupdate')}>Edit Profile</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
