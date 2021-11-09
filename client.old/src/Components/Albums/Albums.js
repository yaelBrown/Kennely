import React, { Component } from 'react'

import WorkInProgress from '../../ReusableComponents/WorkInProgress.js'

export default class Albums extends Component {
  render() {
    return (
      <div className="dashboardContentPanels">
        <h1>Albums</h1>
        <WorkInProgress/>
      </div>
    )
  }
}
