import React, { Component } from 'react'

// Used for buying and selling pet related items.

import WorkInProgress from '../../ReusableComponents/WorkInProgress.js'
export default class Market extends Component {
  render() {
    return (
      <div className="dashboardContentPanels">
        <h1>Market</h1>
        <WorkInProgress/>
      </div>
    )
  }
}
