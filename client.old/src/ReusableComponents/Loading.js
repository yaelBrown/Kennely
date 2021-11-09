import React from 'react'

import LoadingCat from '../Assets/img/LoadingCat.gif'
import LoadingDog from '../Assets/img/LoadingDog.gif'

import '../Assets/css/loading.css'

const loadingStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  opacity: "80%"
}

let imageStyle = {}

export default function Loading() {
  let animal = null
  
  if (Math.floor(Math.random() * Math.floor(2))) {
    animal = LoadingCat
  } else {
    animal = LoadingDog
    imageStyle.width = "10%"
  }

  return (
    <div style={loadingStyle}>
      <img src={animal} alt="" className="loader-img" style={imageStyle}/>
    </div>
  )

}
