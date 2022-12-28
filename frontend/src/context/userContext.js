import {createContext,useContext,useState} from "react"
import Axios from "axios";
import {useNavigate} from "react-router-dom"


export const UserContext = createContext(null);

const UserContextProvider = ({children}) => {
    const navigate = useNavigate();
    const [user,setUser] = useState();
    const [registerInfo,setRegisterInfo] = useState({
        name : "",email : "",password : ""
    })

    const [loginInfo,setLoginInfo] = useState({
        email : "",password : ""
    })
    const [error,setError] = useState({err : "",status : false});
    

    
    const handleRegister = () => {
        if(!registerInfo.name || !registerInfo.password || !registerInfo.email){
            alert("Please Fill All The Fields");
            return;
        }

        registerUser(registerInfo);
        setRegisterInfo({name:"",email:"",password:""})
        
    }

    const registerUser = async (registerInfo) => {
              const data = {
              name: registerInfo.name,
              email: registerInfo.email,
              password:registerInfo.password
            }

            Axios.post('http://localhost:4000/api/users/',data)
            .then(response => {
                if(response && response.data && response.data.status){
                    alert(response.data.msg);
                    setError({status : response.data.status,err : ""})

                }
                else{
                    alert(response.data.err)
                    setError({status : response.data.status,err : response.data.err})
                }
            }).catch(err => {
                console.log(err);
            })
         
     
    }
    const handleLogIn = () => {

        if(!loginInfo.email || !loginInfo.password){
            alert("Please Fill The Filds");
            return
        }

        logInUser(loginInfo);
        setLoginInfo({name : "",email:""});

    }

    const logInUser = (loginInfo) => {

        const data = {
            email : loginInfo.email,
            password : loginInfo.password
        }

        Axios.post('http://localhost:4000/api/users/login',data)
            .then(response => {
                console.log(response)
                if(response && response.data.status){
                    alert(response.data.msg);
                    setUser(response.data.userInfo);
                    localStorage.setItem("token", response.data.userInfo.token);
                    setError({status : response.data.status,err : ""})
                    navigate('/welcome');
                }
                else{
                    console.log(response.data.err)
                    setError({status : response.data.status,err : response.data.err})
                    console.log("error = "+error);
                }
            }).catch(err => {
                console.log(err);
            })


       
    }

    const handleLogOut = () => {
        localStorage.clear();
        setUser();
        navigate('/login');
    }

   
   return(
    <UserContext.Provider value={{registerInfo,setRegisterInfo,handleRegister,error,loginInfo,setLoginInfo,handleLogIn,user,handleLogOut}}>
        {children}
    </UserContext.Provider>
   )
}

export const useUserContext = () => {
    const {registerInfo,setRegisterInfo,handleRegister,error,loginInfo,handleLogIn,user,setLoginInfo,handleLogOut} = useContext(UserContext);
    return {registerInfo,setRegisterInfo,handleRegister,error,loginInfo,handleLogIn,user,setLoginInfo,handleLogOut}
}

export default UserContextProvider;