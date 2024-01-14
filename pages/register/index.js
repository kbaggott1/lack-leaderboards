import { useContext, useEffect, useState } from "react";
import { app, auth } from '../../lib/firebase.js'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "@/context/UserContext.js";
import { useRouter } from "next/router.js";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const {user, setUser} = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if(user) {
            router.push('/');
        }
    }, [user])

    const isValid = () => {
        if(email == "") {
            alert("Email field cannot be empty");
            return false;
        }
        if(password.length < 8) {
            alert("Password must be atleast 8 characters.")
            return false;
        }
        if(password != password2) {
            alert("Passwords do not match")
            return false;
        }
        return true;
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        if(!isValid()) {
            return
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            router.push('/register/claim');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error Code: ${errorCode}, Message: ${errorMessage}`);
        }
     }
    

    return (
        <div className="form-container">
            <div className="form-card">
                <h1>Register</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        <input type="text" className='text-input' name="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <input type="password" className='text-input' name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <input type="password" className='text-input' name="retype-password" placeholder="Retype Password" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                    </div>
                    <div className="submit-button-container">
                        <button type="submit" className='button-submit'>Register</button>
                    </div>
                    
                </form>
            </div>

        </div>
    );
}
