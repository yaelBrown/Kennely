import React from 'react'
import indexVideo from '../../Assets/video/indexBgVideo.mp4'
import '../../Assets/css/backgroundVideo.css'

export default function BackgroundVideo() {
    return (
        <div className="home-videoBg">
            <video 
                autoPlay={true} 
                muted 
                playsInline 
                loop>
                <source src={indexVideo} type="video/mp4"/>
            </video>
        </div>
    )
}
