import React, { Component } from 'react'
import LoginForm from './LoginWindow.js'
import RegisterForm from './RegisterWindow.js'
import ForgotForm from './ForgotWindow.js'
import Footer from '../../ReusableComponents/Footer.js'
import '../../Assets/css/homeWindow.css'

export default class HomeWindow extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      display: "login"
    }
  }
  
  changeDisplay(v) {
    this.setState({display: v})
  }

  displayContent() {
    switch (this.state.display) {
      case "login":
        return <LoginForm data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      case "forgot":
        return <ForgotForm data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      case "register":
        return <RegisterForm data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      default: 
        return <LoginForm data={{changeDisplay: this.changeDisplay.bind(this)}}/>
    }
  }

  render() {
    return (
      <div>
        <div className="homeWindow-window">
          {this.displayContent()}
          <Footer/>
        </div>
      </div>
    )
  }
}
