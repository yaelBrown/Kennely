import React, { Component } from 'react'

import WorkInProgress from '../../ReusableComponents/WorkInProgress.js'

export default class Blog extends Component {
  render() {
    return (
      <div className="dashboardContentPanels">
        <h1>Blog</h1>
        <WorkInProgress/>
      </div>
    )
  }
}
