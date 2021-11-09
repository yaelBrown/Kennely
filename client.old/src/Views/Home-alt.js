import React, { Component } from 'react'
import Loading from '../ReusableComponents/Loading.js'
import BackgroundVideo from '../Components/Home/BackgroundVideo.js'
import HomeWindow from '../Components/Home/HomeWindow.js'

import '../Assets/css/home.css'

export default class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       loading: true
    }
  }
  
  componentDidMount() {
    this.setState({loading: false})
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Loading/>
        </div>
      )
    } else {
      return (
        <div className="homeWindow">
          <BackgroundVideo/>
          <HomeWindow/>
        </div>
      )
    }
  }
}
