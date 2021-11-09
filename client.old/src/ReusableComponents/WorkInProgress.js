import React from 'react'

import WorkingDog from '../Assets/img/workingDog.gif'

import '../Assets/css/workInProgress.css'

export default function WorkInProgress() {
  return (
    <div id="wipSec">
      <h3>Sorry</h3>
      <img src={WorkingDog} alt="working dog" />
      <h4>We are currently still working on this feature!</h4>
      <h4>Check back soon!</h4>
    </div>
  )
}
