import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import apiHandler from "../apihandler"; 
import { NavLink,useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import {userAuthSliceAction} from '../store/UserAuth';

const Login = () => {
    

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {

      setError("Password must be at least 6 characters long");
      setSuccess("");

    } else {

      let optionObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: formData.email, userPassword: formData.password }),

      };

      apiHandler("http://localhost:5000/user/userlogin", optionObj)
        .then((response) => {

          console.log(response);
          if(response.msg === 'Password incorrect'){

            setError("Password incorrect");
          setSuccess("");

          }else if (response.msg === 'User not found'){

            setError("User not found");
            setSuccess("");

          }else if(response.msg === 'Login successfull'){

            localStorage.setItem('userAUTHID',response.userCred)
            dispatch(userAuthSliceAction.setCurrentUser(response.userCred))
            setError("");
            setSuccess("Login successful!");
            dispatch(userAuthSliceAction.setIsLoggedIn(true))
            navigate('/home')
            setFormData({ email: "", password: "" });

          }
       
        })
        .catch((error) => {
          console.log(error);
          setError("Something went wrong");
          setSuccess("");
        });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", width: "100%" }}>
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-4" style={{ color: "#5b8c5a", fontWeight: "bold" }}>
                Login
              </Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                  Login
                </Button>
                <br /> <br />
                <Button onClick={()=> navigate('/forgotpassword')} variant="danger" type="button" className="w-100">
                    Forgot Password
                </Button>
                <br />
                <br />
                <NavLink className="d-flex justify-content-center align-items-center" to='/signup'>New user? Please signup</NavLink>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
