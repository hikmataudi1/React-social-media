import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"


export const Navbar = ()=>{
    
    const [user]=useAuthState(auth)
    const signUserOut =async ()=>{
        await signOut(auth)
    } 
    return(
        <div className="navbar">
            <div className="links">
                <Link to="/">Home</Link>
                { !user ?
                <Link to="/login">Login</Link>  :  //show if user isnt loggedin
                <Link to="/createpost">Create Post</Link> } {/* //show if user is loggedin */}
            </div>
            <div className="user">
                { user&& <>
                    <p>{user?.displayName}</p>
                    <img src={user?.photoURL || "../public/guest.png"} width="20px" height="20px" />
                    <button onClick={signUserOut}>Log out</button>
                </>
            }
            </div>
        </div>
    )
}