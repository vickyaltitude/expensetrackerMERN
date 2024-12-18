import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import apiHandler from "../apihandler";
import { useNavigate } from "react-router-dom";

const ProfileCompleteForm = () => {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    profilePicUrl: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.profilePicUrl) {
      setError("Please fill in all fields.");
      setSuccess("");
    } else {

        apiHandler('http://localhost:5000/user/profileupdate',{
             method: 'POST',
             headers:{
                'Content-Type' : 'application/json',
             },body: JSON.stringify({userId: localStorage.getItem('userAUTHID'),userFullName: formData.fullName,userProfileUrl: formData.profilePicUrl})
        }).then(resp =>{

            setSuccess("Profile updated successfully!");
            setError("");
            console.log(resp)
            navigate('/userprofile')
        }).catch(err => {
            
            console.log(err)
            setSuccess("");
            setError("something went wrong try again");
        })
    
     

   
      setFormData({
        fullName: "",
        profilePicUrl: "",
      });
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", width: "100%" }}
    >
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title
                className="text-center mb-4"
                style={{ color: "#5b8c5a", fontWeight: "bold" }}
              >
                Update Profile
              </Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
           
                <Form.Group controlId="formFullName" className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

              
                <Form.Group controlId="formProfilePicUrl" className="mb-3">
                  <Form.Label>Profile Picture URL</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter profile picture URL"
                    name="profilePicUrl"
                    value={formData.profilePicUrl}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

           
                <Button variant="success" type="submit" className="w-100">
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileCompleteForm;
