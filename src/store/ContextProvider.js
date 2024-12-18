import React,{useState} from 'react'


export const DataContext = React.createContext({
     isLoggedIn: false,
     setIsLoggedIn: ()=>{}
})

const ContextProvider = ({children}) =>{

   const [isLoggedIn,setIsLoggedIn] = useState(false);

   let sendData = {
    isLoggedIn : isLoggedIn,
    setIsLoggedIn: setIsLoggedIn
   }

   return(
      <DataContext.Provider value={sendData}>
         {children}
      </DataContext.Provider>
   )

}

export default ContextProvider