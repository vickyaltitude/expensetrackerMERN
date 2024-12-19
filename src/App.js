import { Route, Routes,NavLink,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "./store/ContextProvider";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ProfileCompleteForm from "./Components/ProfileCompleteForm";
import UserProfile from "./Components/UserProfile";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import AboutPage from "./Components/AboutPage";

function App() {

   const dataCtx = useContext(DataContext);
   const navigate = useNavigate();

   function handleUserAuth(){
     localStorage.removeItem('userAUTHID')
     dataCtx.setIsLoggedIn(false)
     navigate('/login')
   }

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
              {dataCtx.isLoggedIn && <Nav.Link as={NavLink} to="/userprofile" className="nav-link" end>
                My Profile
              </Nav.Link>}
              
            </Nav>
            {dataCtx.isLoggedIn &&  <Button onClick={handleUserAuth}  variant="outline-light">Logout</Button>}
            {!dataCtx.isLoggedIn && <><Button onClick={()=> navigate('/login')} variant="outline-light">Login</Button> /  <Button onClick={()=> navigate('/signup')}variant="outline-light">Signup</Button> </> }
           
          </Navbar.Collapse>
        </Container>
      </Navbar>

     
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/profileupdate" element={<ProfileCompleteForm />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
