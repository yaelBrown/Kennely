import React, { Component } from 'react'

import '../../Assets/css/messenger.css'

import WorkInProgress from '../../ReusableComponents/WorkInProgress.js'
export default class Messenger extends Component {
  render() {
    return (
      <div className="dashboardContentPanels">
        <section id="messengerSec">
          <h1>Messenger</h1>
          <WorkInProgress/>
        </section>
      </div>
    )
  }
}
