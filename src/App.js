import { Route, Routes,NavLink,useNavigate } from "react-router-dom";
import { useSelector,useDispatch  } from "react-redux";

import { userAuthSliceAction } from "./store/UserAuth";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ProfileCompleteForm from "./Components/ProfileCompleteForm";
import UserProfile from "./Components/UserProfile";
import {themeReducerAction} from './store/Theme'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import AboutPage from "./Components/AboutPage";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {

  const isUserLoggedIn = useSelector(state => state.userAuth.isLoggedIn)
  const expenses = useSelector(state => state.expenses.expenses)
  const isDark = useSelector(state => state.theme.darkTheme)
  const [toggleBtn,setToggleBtn] = useState(false)



  const dispatch = useDispatch()

   const navigate = useNavigate();

   function handleUserAuthLogout(){
     localStorage.removeItem('userAUTHID')
     dispatch(userAuthSliceAction.setIsLoggedIn(false))
     dispatch(userAuthSliceAction.setCurrentUser(''))
     navigate('/login')
   }

   
  useEffect(()=>{
    
    const totalSpent = expenses.reduce((cumulative,curr)=> cumulative = cumulative + curr.amount,0);
    
  if(totalSpent > 999){
    dispatch(themeReducerAction.setDark(true))
    setToggleBtn(true)
    localStorage.setItem('theme','dark')
  }else if (totalSpent < 1000){
    dispatch(themeReducerAction.setDark(false))
    setToggleBtn(false)
    localStorage.setItem('theme','light')
  }

  },[expenses])

   useEffect(()=>{
       const currentUserAuth = localStorage.getItem('userAUTHID')
       console.log(currentUserAuth)
       if(!currentUserAuth){
        dispatch(userAuthSliceAction.setIsLoggedIn(false))
        navigate('/login')
       }else{
        dispatch(userAuthSliceAction.setIsLoggedIn(true))
       }
   },[])

   const toggleTheme = () => {
    dispatch(themeReducerAction.toggleTheme())
    
  };

  return (
    <>
     
      <Navbar bg={isDark ? "light" : "dark" } variant={isDark ? "light" : "dark" } expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} href="/home">MyApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
            
           {isUserLoggedIn &&  <Nav.Link as={NavLink} to="/home" className="nav-link" end>
                Home
              </Nav.Link>}
             
              <Nav.Link as={NavLink} to="/about" className="nav-link" end>
                About
              </Nav.Link>
              {isUserLoggedIn && <Nav.Link as={NavLink} to="/userprofile" className="nav-link" end>
                My Profile
              </Nav.Link>}
              
            </Nav>
            {isUserLoggedIn &&  <Button onClick={handleUserAuthLogout}  variant="outline-light">Logout</Button>}
            {!isUserLoggedIn && <><Button onClick={()=> navigate('/login')} variant="outline-light">Login</Button> /  <Button onClick={()=> navigate('/signup')}variant="outline-light">Signup</Button> </> }
            {toggleBtn &&  <Button
            variant={isDark ? 'light' : 'dark'}
            onClick={toggleTheme}
            className="d-flex align-items-center"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </Button>}
           
           
          </Navbar.Collapse>
        </Container>
      </Navbar>

     
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
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
