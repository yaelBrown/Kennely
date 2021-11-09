import React, { Component } from 'react'

// Used for adopting pets

import WorkInProgress from '../../ReusableComponents/WorkInProgress.js'
export default class Adopt extends Component {
  render() {
    return (
      <div className="dashboardContentPanels">
        <h1>Adopt</h1>
        <WorkInProgress/>
      </div>
    )
  }
}
