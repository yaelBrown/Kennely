import React, { Component } from 'react'
import Icon from "@iconify/react"
import photoIcon from '@iconify-icons/bytesize/photo'
import videoIcon from '@iconify-icons/bytesize/video'
import sendIcon from '@iconify-icons/grommet-icons/send'

import FeedProfilePicturePlaceholder from './FeedProfilePicturePlaceholder.js'

import PostService from '../../Services/PostService.js'

import '../../Assets/css/feedCreatePost.css'

export default class FeedCreatePost extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      postType: "text",
      authorId: "606e6930ab392cc972f76f9f", // David Michel
      caption: "",
      petsTagged: [],
      contentSrc: ""
    }
  }

  createPostHdlr() {
    if (!this.state.caption) return
    let newPost = {...this.state}
    
    if (this.state.postType === "photo" && this.state.contentSrc === "") return

    let res = PostService.createPost(newPost)
    
    if (typeof(res) == "object") {
      this.clearInput()
      setTimeout(() => {}, 500)
      this.props.data.updateFeed()
    } else {
      return
    }
  }
  
  handleChange = (property, val) => {
    if (val.length > 255) return
    this.setState({[property]: val})
  }

  clearInput() {
    let newState = {
      postType: "text",
      authorId: "606e6930ab392cc972f76f9f", // David Michel
      caption: "",
      petsTagged: [],
      contentSrc: ""
    }
    this.setState(newState)
  }

  render() {
    const fcpIconSizes = "1.5rem"
    return (
      <div id="fcPost">
        <div className="feedDivLeft feedDivs">
          <FeedProfilePicturePlaceholder/>
        </div>
        <div className="feedDivRight feedDivs">
          <textarea 
            placeholder="What do you want to share?" 
            onChange={(e) => this.handleChange("caption", e.target.value)}
            value={this.state.caption}
            className="fcPostInput" />
          <label for="fcPostFileInput">
            <Icon 
              icon={photoIcon} 
              width={fcpIconSizes} 
              height={fcpIconSizes} 
              className="fcpIcons" />
          </label>
          <input id="fcPostFileInput" type="file" accept="image/*"/>
          {/* <Icon 
            icon={videoIcon} 
            width={fcpIconSizes} 
            height={fcpIconSizes} 
            className="fcpIcons" /> */}
          <Icon 
            icon={sendIcon} 
            width={fcpIconSizes} 
            height={fcpIconSizes} 
            className="fcpIcons" 
            onClick={() => this.createPostHdlr()} />
        </div>
      </div>
    )
  }
}
