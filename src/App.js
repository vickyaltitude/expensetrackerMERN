import { Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ProfileCompleteForm from "./Components/ProfileCompleteForm";


function App() {
  return (
    <>
        

          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/profileupdate' element={<ProfileCompleteForm />} />
          </Routes>
    </>
  );
}

export default App;
