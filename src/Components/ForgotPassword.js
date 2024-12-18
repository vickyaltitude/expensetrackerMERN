import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import apiHandler from '../apihandler'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter a valid email.');
      return;
    }

 
    setError('');
    setSuccess('');

   
    const requestData = { email: email };

    
    apiHandler('http://localhost:5000/forgotpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        console.log(response)
        if(response.msg === 'user not found'){
            setError('User not found with our database');
        }else{
            setSuccess('Password reset link has been sent to your email.');
            setEmail('');
        }
       
      })
      .catch((err) => {
        setError('Something went wrong. Please try again later.');
        console.error(err);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', width: '100%' }}>
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4" style={{ color: '#5b8c5a', fontWeight: 'bold' }}>
                Forgot Password
              </Card.Title>

      
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
              
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

         
                <Button variant="success" type="submit" className="w-100">
                  Send Reset Link
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
