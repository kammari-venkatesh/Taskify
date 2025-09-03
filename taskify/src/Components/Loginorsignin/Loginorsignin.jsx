import  './index.css'
import { useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';


const Loginorsignin = () =>{
  const navigate = useNavigate();
    const [isSignIn, setIsSignIn] = useState(true);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [submiterror, setSubmitError] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginemailError, setLoginEmailError] = useState("");
    const [loginpasswordError, setLoginPasswordError] = useState("");

    const onClicksignin = () => {
        setIsSignIn(true);
    };
    const onClicklogin = () => {
        setIsSignIn(false);
    };

    const validateName = () => {
        if (name.trim() === "") {
            setNameError("Name is required");
        } else {
            setNameError("");
        }
    };

    const validateEmail = () => {
        if (email.trim() === "") {
            setEmailError("Email is required");
        } else {
            setEmailError("");
        }
    };

    const validatePassword = () => {
        if (password.trim() === "") {
            setPasswordError("Password is required");
        } else {
            setPasswordError("");
        }
    };

    const validateConfirmPassword = () => {
        if (confirmPassword.trim() === "") {
            setConfirmPasswordError("Confirm Password is required");
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError("");
        }
    };

    const onchangeConfirmPassword  = (e) =>{
        setConfirmPassword(e.target.value);
    }
 const onchangeName = (e) =>{
        setName(e.target.value);
    }
 const onchangeEmail = (e) =>{
        setEmail(e.target.value);
    }
 const onchangePassword = (e) =>{
        setPassword(e.target.value);
    }
 const onchangeloginemail = (e) =>{
       setLoginEmail(e.target.value);
   }
 const onchangeloginpassword = (e) =>{
       setLoginPassword(e.target.value);
   }
const handleSignIn = (e) =>{
        e.preventDefault();
       if(nameError || emailError || passwordError || confirmPasswordError) {
           setSubmitError("Please fix the errors before submitting.");
       }else{
        const fetchusersignin = async () => {
            const userData = {
                name,
                email,
                password,
                confirmPassword
            };
            console.log("User data:", userData);
            const apiUrl = "http://localhost:3000/api/Auth/usersignin"; 
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            };

           try {
               const response = await fetch(apiUrl, options);
               console.log("signinresponse:", response);
               const data = await response.json();
               console.log(data)

               if (response.status === 200) {
                   setSubmitError("");
                           setIsSignIn(false);

                   
                   console.log("Sign-in successful:", data);
               } else {
                   // Handle errors
                   console.error("Sign-in failed:", data);
                   setSubmitError(data.message || "Sign-in failed");
               }
           } catch (error) {
               console.error("Error occurred during sign-in:", error);
               setSubmitError(`An error occurred. Please try again. ${error.message}`);
           }
       };

       fetchusersignin();
   }

       // Proceed with sign-in
    }
 const validateloginEmail = () => {
    if (loginEmail.trim() === "") {
        setLoginEmailError("Email is required");
    } else {
        setLoginEmailError("");
    }
};
const validateloginPassword = () => {
    if (loginPassword.trim() === "") {
        setLoginPasswordError("Password is required");
    } else {
        setLoginPasswordError("");
    }
};
const handleLogin = (e) =>{
    e.preventDefault();

 const fetchuserlogin = async () => {
     const userData = {
         email: loginEmail,
         password: loginPassword
     };
     const apiUrl = "http://localhost:3000/api/Auth/userlogin";
     const options = {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify(userData)
     };

     try {
         const response = await fetch(apiUrl, options);
         const data = await response.json();

         if (response.status === 200) {
             setEmailError("");
             setPasswordError("");
             Cookies.set('jwtToken', data.token, { expires: 1000});
             Cookies.set('username', data.message.name, { expires: 1000});
             console.log("username in auth",data.message.name)
             console.log("Login successful:", data);
              navigate('/');

         } else {
             setEmailError(data.email || "");
             setPasswordError(data.password || "");
             console.error("Login failed:", data);
         }
     } catch (error) {
         console.error("Error occurred during login:", error);
     }
 };

 fetchuserlogin();
}

const onClickSignUp = () => {
    setIsSignIn(true);
    setLoginEmail("");
    setLoginPassword("");
    setLoginEmailError("");
    setLoginPasswordError("");
};


    return(
        <div className='loginorsignin-container'>
            <img src='https://res.cloudinary.com/dwatnpdcy/image/upload/Screenshot_2025-08-28_185237_ppyw9y.png' className='company-loginlogo' />
            <div className='loginorsignin-content'>
                <div className='top-buttons'>
                    <button className='signin-content-button' onClick={onClicksignin}>Signin</button>
                    <button className='login-content-button' onClick={onClicklogin}>Login</button>
                </div>
           {isSignIn ? (
  <form className="signin-form" onSubmit={handleSignIn}>
    <label>
      Name
      <input type="text" placeholder="Enter your name" className="signin-input" onChange={onchangeName} onBlur={validateName} />
      <p className='error-message'>{nameError}</p>
    </label>
    <label>
      Email
      <input type="text" placeholder="Enter your email" className="signin-input" onChange={onchangeEmail} onBlur={validateEmail} />
      <p className='error-message'>{emailError}</p>
    </label>
    <label>
      Password
      <input type="password" placeholder="Enter your password" className="signin-input" onChange={onchangePassword} onBlur={validatePassword} />
      <p className='error-message'>{passwordError}</p>
    </label>
     <label>
      confirmPassword
      <input type="password" placeholder="confirm Password" className="signin-input" onChange={onchangeConfirmPassword} onBlur={validateConfirmPassword} />
      <p className='error-message'>{confirmPasswordError}</p>
    </label>
    <p className='error-message'>{submiterror}</p>
    <button type="submit" className="signin-submit-button">Signin</button>
    <p className="signin-note">Already have an account? <span onClick={onClicklogin}>Login</span></p>
  </form>
) : (
  <form className="login-form" onSubmit={handleLogin}>
    <label>
      Email
      <input type="text" placeholder="Enter your email" className="login-input" onChange={onchangeloginemail} onBlur={validateloginEmail}/>
      <p className='error-message'>{loginemailError}</p>
    </label>
    <label>
      Password
      <input type="password" placeholder="Enter your password" className="login-input"  onChange={onchangeloginpassword} onBlur={validateloginPassword}/>
      <p className='error-message'>{loginpasswordError}</p>
    </label>
    <button type="submit" className="login-submit-button">Login</button>
    <p className="signin-note">
  Don't have an account? <span onClick={onClickSignUp}>Sign Up</span>
</p>
  </form>
)}

            </div>
        </div>
    )
}
export default Loginorsignin