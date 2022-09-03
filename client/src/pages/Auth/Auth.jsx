import React, { useState, componentWillMount } from "react";
import "./Auth.css";
import Logo from "../../img/icon-left-font.png";
import { logIn, signUp } from "../../actions/AuthActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
 
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
    errors: {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
    }
  };
  const loading = useSelector((state) => state.authReducer.loading);
  const errorMessage = useSelector(state => state.authReducer.error)
  const [freshForm, setFreshForm] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState(initialState);

  const [confirmPass, setConfirmPass] = useState(true);

  // const dispatch = useDispatch()


  // Reset Form
  const resetForm = () => {
    setFreshForm(true);
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  // handle Change in input
  const handleChange = (e) => {

    switch (e.target.name) {
      case 'firstname': 
      data.errors.firstname = 
            e.target.value === ''
            ? 'Le champ prenom est requis'
            : '';
        break;
      case 'lastname': 
      data.errors.lastname = 
            e.target.value === ''
            ? 'Le champ nom est requis'
            : '';
        break;
      case 'username': 
      data.errors.username = 
            e.target.value === ''
            ? 'Le champ uesrname est requis'
            : '';
        break;
      case 'password': 
      data.errors.password = 
            e.target.value.length < 8
            ? 'Mot de passe doit etre au minimum 8 characters!'
            : '';
        break;
      case 'confirmpass': 
      data.errors.password = 
            e.target.value.length < 8
            ? 'Mot de passe doit etre au minimum 8 characters!'
            : '';
        break;
      default:
        break;
    }


    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    setFreshForm(false);
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data, navigate))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data, navigate));
    }

  };

  return (
    <div className="Auth">
      {/* left side */}

      <div className="a-left">

        <div className="Webname">
          <img src={Logo} alt="" />
          <h1>Bienvenue</h1>
          <h6>Notre reseau social d'entreprise</h6>
        </div>
      </div>

      {/* right form side */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Inscrivez-vous" : "Connectez-vous"}</h3>
          {errorMessage && !freshForm &&
           <p className="error">
              {errorMessage}
           </p>
          }
         
          {isSignUp && (
            <div>
                <div>
                  <input
                    required
                    placeholder="First Name"
                    className="infoInput"
                    name="firstname"
                    onBlur={handleChange}
                    onChange={handleChange}
                    value={data.firstname}
                  />
                  <br/>
                   {data.errors.firstname && 
                    <span className="error">{data.errors.firstname}</span>
                   }
                </div>
             
            
                <div>
                  <input
                    required
                    type="text"
                    placeholder="Last Name"
                    className="infoInput"
                    name="lastname"
                    value={data.lastname}
                    onBlur={handleChange}
                    onChange={handleChange}
                  />

                  {data.errors.lastname && 
                    <span className="error">{data.errors.lastname}</span>
                   }
              </div>
            </div>
          )}

          <div>
            <input
              required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />

              {data.errors.username && 
                <span className="error">{data.errors.lastname}</span>
              }
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onBlur={handleChange}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onBlur={handleChange}
                onChange={handleChange}
              />
            )}

          {data.errors.password && 
                <span className="error">{data.errors.password}</span>
              }
          </div>

          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Vous avez déjà un compte Connectez-vous"
                : "Vous n'avez pas de compte Inscrivez-vous"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
