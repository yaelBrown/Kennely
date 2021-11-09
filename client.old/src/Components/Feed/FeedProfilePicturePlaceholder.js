import React from 'react'

import userProfilePicturePlaceholder from '../../Assets/img/userPlaceholder.jpg'

import '../../Assets/css/feedProfilePicturePlaceholder.css'

export default function FeedProfilePicturePlaceholder() {
  return (
    <div>
      <img src={userProfilePicturePlaceholder} alt="profile picture" id="fpppImage"/>
    </div>
  )
}
