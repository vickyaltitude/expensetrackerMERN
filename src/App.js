import { Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ProfileCompleteForm from "./Components/ProfileCompleteForm";
import UserProfile from "./Components/UserProfile";


function App() {
  return (
    <>
        

          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/profileupdate' element={<ProfileCompleteForm />} />
            <Route path='/userprofile' element={<UserProfile />} />
          </Routes>
    </>
  );
}

export default App;
