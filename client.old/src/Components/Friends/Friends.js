import React, { Component } from 'react'

import WorkInProgress from '../../ReusableComponents/WorkInProgress.js'

export default class Friends extends Component {
  render() {
    return (
      <div className="dashboardContentPanels">
        <h1>Friends</h1>
        <WorkInProgress/>
      </div>
    )
  }
}
