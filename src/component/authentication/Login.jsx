import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="auth-container">
      <div className={`form-container ${isSignUp ? 'sign-up-mode' : ''}`}>
        <div className="signin-signup">
          <form className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <button className="btn solid">Login</button>
          </form>

          <form className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <button className="btn solid">Sign Up</button>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>
              Sign up and start managing your tasks efficiently!
            </p>
            <button className="btn transparent" onClick={toggleForm}>
              Sign Up
            </button>
          </div>
          <img src="path_to_image" className="image" alt="sign up" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Already have an account?</h3>
            <p>
              Log in and continue managing your tasks!
            </p>
            <button className="btn transparent" onClick={toggleForm}>
              Sign In
            </button>
          </div>
          <img src="path_to_image" className="image" alt="sign in" />
        </div>
      </div>
    </div>
  );
};

export default Login;
