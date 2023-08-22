import { React, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import "./Auth.css";
import welcome from "../../assets/welcome.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

 

  const handleFormChange = (form) => {
    if(form == "register"){
      setIsLogin(false);
    }else{
      setIsLogin(true);
    }
  };
  return (
    <div className="auth">
      <div className="image">
        <img src={welcome} alt="Welcome" />
      </div>

      <div className="forms">
        <div className="tabs">
          <h4 onClick={() => handleFormChange("login")} className={isLogin && "activetab"}>Login</h4>
          <h4 onClick={() => handleFormChange("register")} className={!isLogin && "activetab"}>Register</h4> 
        </div>
        <div className="form-content">{isLogin ? <Login /> : <Register />}</div>
      </div>
    </div>
  );
};

const Login = () => {
  const url = "https://food-recipe-backend.vercel.app"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 const [showInfo, setShowInfo] = useState(false);
 const [info, setInfo] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/auth/login`, {
        username,
        password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userId", response.data.userId);
      window.localStorage.setItem("username", response.data.username);
      navigate("/");
    } catch (error) {
      setInfo(error.response.data.message);
      setShowInfo(true);
    }
  };
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Welcome Back! Login to your account and start cooking!"
      btn="Login"
      onSubmit={onSubmit}
      showInfo={showInfo}
      info={info}
    />
  );
};

const Register = () => {
  const url = "https://food-recipe-backend.vercel.app"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfo] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.post(`${url}/auth/register`, {
        username,
        password,
      }).then(async() => {
        const response = await axios.post(`${url}/auth/login`, {
          username,
          password,
        });
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userId", response.data.userId);
        window.localStorage.setItem("username", response.data.username);
        navigate("/");
        
      });
    } catch (error) {
      setInfo(error.response.data.message);
      setShowInfo(true);
      
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Welcome to our Delicious Recipes Community!"
      btn="Register"
      onSubmit={onSubmit}
      showInfo={showInfo}
      info={info}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  btn,
  onSubmit,
  showInfo,
  info,
}) => {

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form=group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="form=group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button type="submit">{btn}</button>
        {showInfo && <h5 className="status">{info}</h5>}
      </form>
    </div>
  );
};

export default Auth;
