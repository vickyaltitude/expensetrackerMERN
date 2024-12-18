import { Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ProfileCompleteForm from "./Components/ProfileCompleteForm";
import UserProfile from "./Components/UserProfile";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <>
     
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">MyApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
            
              <Nav.Link as={NavLink} to="/" className="nav-link" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="nav-link" end>
                About
              </Nav.Link>
              <Nav.Link as={NavLink} to="/userprofile" className="nav-link" end>
                My Profile
              </Nav.Link>
            </Nav>
            
            <Button variant="outline-light">Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

     
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/profileupdate" element={<ProfileCompleteForm />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
