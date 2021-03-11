import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

import LinksFooter from '../Components/Home/LinkFooter.js'
import Loading from '../ReusableComponents/Loading.js'
import LeftSide from '../Components/Dashboard/LeftSide.js'
import RightSide from '../Components/Dashboard/RightSide.js'
import SearchBar from '../Components/Dashboard/Searchbar.js'
import MessengerSidebar from '../Components/Messenger/MessengerSidebar.js'

import UserFeed from '../Components/Feed/Feed.js'
import Albums from '../Components/Albums/Albums.js'
import Adopt from '../Components/Adopt/Adopt.js'
import Friends from '../Components/Friends/Friends.js'
import Profile from '../Components/Profile/Profile.js'
import Options from '../Components/Options/Options.js'

import DashboardService from '../Services/DashboardService.js'
import LoginService from '../Services/LoginService.js'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      loading: true,
      display: "feed",
      loggedIn: "",
      userPath: ""
    }
  }
  
  // research websockets

  componentWillMount() {
    // open websocket
    let newState = {...this.state}
    let curPath = window.location.pathname
    newState.loggedIn = true
    let viewUserProfile = curPath.includes("/u/")

    if (curPath === "/profile" || viewUserProfile) {
      newState.display = "profile"
      if (viewUserProfile) {
        newState.userPath = curPath.slice(3, curPath.length)
      }
    }
    
    // newState.loading = false
    this.setState(newState)
  }

  displayContent() {
    switch (this.state.display) {
      case "feed":
        return <UserFeed/>
      case "albums":
        return <Albums/>
      case "adopt":
        return <Adopt/>
      case "friends":
        return <Friends/>
      case "profile":
        return <Profile/>
      case "options":
        return <Options/>
      default: 
        return <UserFeed/>
    }
  }

  render() {
    const styleHidden = {display: "none"}
    const styleVisible = {display: "initial"}

    if (this.state.loading) {
      return (
        <div>
          <Loading/>
        </div>
      )
    } else {   
      return (
        <div>
          <h1>Dashboard</h1>
          <LeftSide/>
          <RightSide/>
          <SearchBar/>
          <MessengerSidebar/>
          <LinksFooter/>
          {this.displayContent()}
        </div>
      )
    }
  }
}
