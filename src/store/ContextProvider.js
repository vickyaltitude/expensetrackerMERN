import React,{useState,useEffect,useRef} from 'react';
import apiHandler from '../apihandler';

export const DataContext = React.createContext({
     expenses: [],
     setExpenses: ()=> {},
     isLoggedIn: false,
     setIsLoggedIn: ()=>{}
})

const ContextProvider = ({children}) =>{

    const isInitialMount = useRef(true);
    const [expenses,setExpenses] = useState([])

   const [isLoggedIn,setIsLoggedIn] = useState(false);

   let sendData = {
      expenses: expenses,
      setExpenses: setExpenses,
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

   useEffect(()=>{

      if(isInitialMount.current){
         isInitialMount.current = false;
         return
      }

      apiHandler('http://localhost:5000/postexpense',{
         method: 'POST',
         headers:{
            'Content-Type' : 'application/json',
         },
         body: JSON.stringify({userId: localStorage.getItem('userAUTHID'),expenses: expenses})
      }).then(resp =>{
         console.log(resp)
      }).catch(err => console.log(err))

   },[expenses])

   useEffect(()=>{
       
   })

   return(
      <DataContext.Provider value={sendData}>
         {children}
      </DataContext.Provider>
   )

}

export default ContextProvider