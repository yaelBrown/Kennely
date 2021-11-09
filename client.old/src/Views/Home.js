import React, { Component } from 'react'
import Loading from '../ReusableComponents/Loading.js'
// import BackgroundVideo from '../Components/Home/BackgroundVideo.js'
import HomeWindow from '../Components/Home/HomeWindow.js'

import '../Assets/css/home.css'

// import home1 from '../Assets/img/home/home01.jpg'
// import home2 from '../Assets/img/home/home02.jpg'
// import home3 from '../Assets/img/home/home03.jpg'
// import home4 from '../Assets/img/home/home04.jpg'
// import home5 from '../Assets/img/home/home05.jpg'
// import home6 from '../Assets/img/home/home06.webp'
// import home7 from '../Assets/img/home/home07.jpg'
// import home8 from '../Assets/img/home/home08.jpg'
import home9 from '../Assets/img/home/home09.jpg'

export default class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      loading: false,
      sideImage: home9
    }
  }
  
  componentDidMount() {
    window.onload = () => {
      window.setTimeout(() => {
        this.setState({loading: false})
      }, 3000)
      console.log("this ran")
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="homeWindow">
          <Loading/>
          testing
        </div>
      )
    } else {
      return (
        <div className="homeWindow2">
          <section id="homeLeft">
            <h1 className="display-3">Kennely</h1>
            <HomeWindow/>
          </section>
          <section id="homeRight">
            <img src={this.state.sideImage} id="sideImage" alt="side img"/>
          </section>
        </div>
      )
    }
  }
}
