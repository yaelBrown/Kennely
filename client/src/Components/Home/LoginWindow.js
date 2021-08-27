import React, { Component, useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'

import LoginService from '../../Services/LoginService.js'

import '../../Assets/css/loginRegisterForgetForms.css'

function LoginWindow(props) {
  const initialState = {
      email: "",
      password: "",
      rememberMe: false,
  }

  const [state, setState] = useState(initialState);
  
  let history = useHistory();

  const clearPasswordWithinForm = () => {
   setState(state.password = "")
  }

  const handleChange = (property, val) => {
    val = val.trim()
    let newState = {...state}
    newState[property] = val
    setState(newState)
  }
 
  const handleLogin = () => {
    // console.log({email: state.email, password: state.password, rememerMe: state.rememberMe})

    if (!state.email || !state.password) return
    let rememberMe = state.rememberMe
    
    if (state.rememberMe === "on") {
      rememberMe = true
    }

    LoginService.login(state.email, state.password, rememberMe)
      .then(data => {
        if (typeof(data)  === "object") {
          data.isAuth = true
          console.log(data)
          props.userToStore(data)
          history.push("/dashboard")
        } else { 
          clearPasswordWithinForm()
          console.error("Invalid Login")
        }
      })
  }

  return (
    <div className="loginForm">
      <h3>Login</h3>
      <table id="loginTable">
        <tbody>
          <tr>
            <td className="textLeft"><h6>Email</h6></td>
            <td><input 
              type="text" 
              placeholder="email@address.com" 
              onChange={(e) => handleChange("email", e.target.value)}
              value={state.email}></input></td>
          </tr>
          <tr>
            <td className="textLeft"><h6>Password</h6></td>
            <td><input 
              type="password" 
              placeholder="password" 
              onChange={(e) => handleChange("password", e.target.value)}
              value={state.password}></input></td>
          </tr>
          <tr>
            <td id="loginTableThirdRow"><input 
              type="checkbox" 
              onChange={(e) => handleChange("rememberMe", e.target.value)}
              value={state.rememberMe}></input> <small>Remember me?</small></td>
            <td><small onClick={() => props.data.changeDisplay("forgot")} style={{cursor: "pointer"}}>Forgot Password</small></td>
          </tr>
        </tbody>
      </table>
      <div className="loginButtonRow">
        <Button color="secondary" onClick={() => props.data.changeDisplay("register")}>Register</Button>
        <Button color="primary" onClick={() => handleLogin()}>Login</Button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userToStore: (payload) => dispatch({ type: "USER_TO_STORE", payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginWindow)