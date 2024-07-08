import { provider , auth } from "../config/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
export const Login = ()=>{

    const navigate = useNavigate()
    const signInWithGoogle= async ()=>{
       const result = await signInWithPopup(auth,provider)
        navigate("/")    
    }
    return(
        <div>
            <h1>Log in Page</h1>
            <p>Sign in to continue</p>
            <button onClick={signInWithGoogle}> Sign in with google</button>
        </div>   
    )
}