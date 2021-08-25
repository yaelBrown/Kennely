import React, { Component } from 'react'
import { Button } from 'reactstrap'
import Switch from 'react-switch'

import RegisterService from '../../Services/RegisterService.js'

import '../../Assets/css/loginRegisterForgetForms.css'

class RegisterWindow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      email: "",
      password: "",
      location: "",
      gender: true,
      profilePic: "/Assets/img/userPlaceholder.jpg"
    }
  }

  handleChange = (property, val) => {   
    this.setState({[property]: val})
  }

  handleToggle = () => {
    this.setState({gender: !this.state.gender})
  }

  handleRegister = () => {
    let allInputsValid = true;
    let message = ""
    
    if (!RegisterService.validateInput("name", this.state.name)) {
      allInputsValid = false
      message = "Invalid name"
    }

    if (!RegisterService.validateInput("email", this.state.email)) {
      allInputsValid = false
      message = "Invalid email"
    }

    if (!RegisterService.validateInput("password", this.state.password)) {
      allInputsValid = false
      message = "Invalid password"
    }

    if (!RegisterService.validateInput("location", this.state.location)) {
      allInputsValid = false
      message = "Invalid location"
    }

    if (allInputsValid) {
      RegisterService.registerUser(this.state)
        .then(data => {
          if (data.msg === "successfully registered user") {
            this.props.data.changeDisplay("login")
          }
        })
        .catch(error => {
          console.error("Error saving user: " + error)
        })
    } else {
      console.error("Error in the register form: " + message)
      console.log({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        location: this.state.location
      })
    }
  }

  render() {
    let genderSliderStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      fontSize: 15,
      color: "white",
      paddingRight: 2
    }

    return (
      <div className="registerForm">
        <h3>Register</h3>
        <table id="registerTable">
          <tbody>
            <tr>
              <td className="registerTableLeft"><h6>Name</h6></td>
              <td className="registerTableRight">
                <input 
                  type="text"
                  onChange={(e) => this.handleChange("name", e.target.value)}
                  value={this.state.name}
                  required
                ></input>
              </td>
            </tr>
            <tr>
              <td className="registerTableLeft"><h6>Email</h6></td>
              <td className="registerTableRight">
                <input 
                  type="email"
                  onChange={(e) => this.handleChange("email", e.target.value)}
                  value={this.state.email} 
                  required
                ></input></td>
            </tr>
            <tr>
              <td className="registerTableLeft"><h6>Password</h6></td>
              <td className="registerTableRight">
                <form>
                  <input 
                    type="password"
                    onChange={(e) => this.handleChange("password", e.target.value)}
                    value={this.state.password} 
                    required
                  ></input>
                </form>
              </td>
            </tr>
            <tr>
              <td className="registerTableLeft"><h6>Location</h6></td>
              <td className="registerTableRight">
                <input 
                  type="text" 
                  onChange={(e) => this.handleChange("location", e.target.value)}
                  value={this.state.location} 
                  required
                ></input></td>
            </tr>
            <tr>
              <td className="registerTableLeft"><h6>Gender</h6></td>
              <td className="registerTableRight">
                <label>
                  <Switch 
                    onChange={(e) => this.handleToggle()}
                    checked={this.state.gender}
                    checkedIcon={<p style={genderSliderStyle}>M</p>}
                    uncheckedIcon={<p style={genderSliderStyle}>F</p>}
                    onColor="#0088ff"
                    offColor="#ff00e1"
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td className="registerTableLeft"><h6>Profile Picture</h6></td>
              <td className="registerTableRight">
                <input 
                  type="file" 
                  required
                  readOnly
                ></input></td>
            </tr>
          </tbody>
        </table>
        <div className="row registerButtonRow">
          <Button color="secondary" onClick={() => this.props.data.changeDisplay("login")}>Return to Login</Button>
          <Button color="primary" onClick={() => this.handleRegister()}>Signup</Button>
        </div>
      </div>
    )
  }
}

export default RegisterWindow