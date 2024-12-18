import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


export const DataContext = React.createContext({
     isLoggedIn: false,
     setIsLoggedIn: ()=>{}
})

const ContextProvider = ({children}) =>{

    const navigate = useNavigate()

   const [isLoggedIn,setIsLoggedIn] = useState(false);

   let sendData = {
    isLoggedIn : isLoggedIn,
    setIsLoggedIn: setIsLoggedIn
   }

   useEffect(()=>{

     if(!localStorage.getItem('userAUTHID')){
        setIsLoggedIn(false)
     }else{
        setIsLoggedIn(true)
     }

   },[])

   return(
      <DataContext.Provider value={sendData}>
         {children}
      </DataContext.Provider>
   )

}

export default ContextProvider