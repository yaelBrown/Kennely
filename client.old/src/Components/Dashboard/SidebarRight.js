import React, { Component } from 'react'
import Footer from '../../ReusableComponents/Footer'

import '../../Assets/css/sidebarRight.css'

export default class SidebarRight extends Component {
  render() {
    return (
      <div id="sidebarRight">
        <h1>Sidebar Right</h1>
        <Footer/>
      </div>
    )
  }
}
