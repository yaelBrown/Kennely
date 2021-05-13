import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'

import LoginService from '../../Services/LoginService.js'

import '../../Assets/css/loginRegisterForgetForms.css'

import * as actionTypes from '../../Redux/Home/homeActions.js'
import { addUserToStore } from '../../Redux/Home/homeActions.js'

class LoginWindow extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       email: "",
       password: "",
       rememberMe: false,
    }
  }

  clearPasswordWithinForm = () => {
    this.setState({password: ""})
  }

  handleChange = (property, val) => {
    val = val.trim()
    this.setState({[property]: val})
  }
 
  handleLogin = () => {
    if (!this.state.email || !this.state.password) return
    let rememberMe = this.state.rememberMe
    
    if (this.state.rememberMe === "on") {
      rememberMe = true
    }
    // console.log({email: this.state.email, password: this.state.password, rememberMe})
    LoginService.login(this.state.email, this.state.password, rememberMe)
      .then(data => {
        console.log(data)
        if (typeof(data)  === "object") {
          this.props.userToStore(data)
          window.location.href = "/dashboard"
        } else { 
          this.clearPasswordWithinForm()
          console.error("Invalid Login")
        }
      })
  }

  render() {
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
                onChange={(e) => this.handleChange("email", e.target.value)}
                value={this.state.email}></input></td>
            </tr>
            <tr>
              <td className="textLeft"><h6>Password</h6></td>
              <td><input 
                type="password" 
                placeholder="password" 
                onChange={(e) => this.handleChange("password", e.target.value)}
                value={this.state.password}></input></td>
            </tr>
            <tr>
              <td id="loginTableThirdRow"><input 
                type="checkbox" 
                onChange={(e) => this.handleChange("rememberMe", e.target.value)}
                value={this.state.rememberMe}></input> <small>Remember me?</small></td>
              <td><small onClick={() => this.props.data.changeDisplay("forgot")} style={{cursor: "pointer"}}>Forgot Password</small></td>
            </tr>
          </tbody>
        </table>
        <div className="loginButtonRow">
          <Button color="secondary" onClick={() => this.props.data.changeDisplay("register")}>Register</Button>
          <Button color="primary" onClick={() => this.handleLogin()}>Login</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userToStore: (userData) => dispatch(addUserToStore(userData)) // need to add payload to this method
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginWindow)