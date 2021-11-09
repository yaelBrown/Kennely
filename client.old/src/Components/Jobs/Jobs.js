import React, { Component } from 'react'

// Used for searching for jobs with Peterest or for working with pets

import WorkInProgress from '../../ReusableComponents/WorkInProgress.js'

export default class Jobs extends Component {
  render() {
    return (
      <div className="dashboardContentPanels">
        <h1>Jobs</h1>
        <WorkInProgress/>
      </div>
    )
  }
}
