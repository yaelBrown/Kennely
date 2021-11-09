import React from 'react'

import '../../Assets/css/dashboardSidebarLeftProfilePicture.css'

import userProfilePicturePlaceholder from '../../Assets/img/userPlaceholder.jpg'

export default function SidebarLeftProfilePicture() {
  return (
    <div>
      <img src={userProfilePicturePlaceholder} alt="profile picture" id="dbpp"/>
    </div>
  )
}
