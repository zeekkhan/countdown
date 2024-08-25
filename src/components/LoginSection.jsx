import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/FirebaseConfig";
import { useNavigate } from 'react-router-dom';
// import loginImage from "../assets/loginImage.jpg";
// import Header from './Header';

function LoginSection() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignInActive, setIsSignInActive] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleMethodChange() {
        setIsSignInActive(!isSignInActive);
        setError("");
    }

    function handleSignin(e) {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter email and password!");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                const user = response.user;
                navigate("/private-page");
            })
            .catch(error => {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }

    function handleSignup(e) {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter email and password!");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(response => {
                const user = response.user;
                navigate("/private-page");
            })
            .catch(error => {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }

    return (
        <>
        {/* <Header /> */}
        <div className="login-container">
            {/* <h1 className="login-heading">Please sign in or sign up first is mandatory for the Access the Application</h1> */}
            <p className="login-subheading">Please {isSignInActive ? "Sign In" : "Sign Up"} to continue</p>
            <div className="content-wrapper">
                <div className="image-container">
                    {/* <img src={"sicdsn"} alt="Attendance Management System" className="attendance-image" /> */}
                </div>
                <div className="form-container">
                    <form className="form">
                        <h2>{isSignInActive ? <span style={{ color: "green" }}>Sign In</span> : <span style={{ color: "#2196f3" }}>Sign Up</span>}</h2>

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" placeholder="Enter your email" onChange={handleEmailChange} className="input-field" value={email} />

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter your password" onChange={handlePasswordChange} className="input-field" value={password} />

                        {error && <p className="error-message">{error}</p>}

                        {isSignInActive ? (
                            <button onClick={handleSignin} className="button sign-in-btn">Sign In</button>
                        ) : (
                            <button onClick={handleSignup} className="button sign-up-btn">Sign Up</button>
                        )}

                        <p className="form-switch">
                            {isSignInActive ? "Don't have an account? " : "Already have an account? "}
                            <span onClick={handleMethodChange} className="form-switch-link">
                                {isSignInActive ? "Sign up" : "Sign in"}
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default LoginSection;
