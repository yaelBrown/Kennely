import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Loading from '../ReusableComponents/Loading.js'
import SidebarLeft from '../Components/Dashboard/SidebarLeft.js'
import SidebarRight from '../Components/Dashboard/SidebarRight.js'
import SearchBar from '../Components/Search/Searchbar.js'
import Feed from '../Components/Feed/Feed.js'
import Profile from '../Components/Profile/Profile.js'
import ProfileEdit from '../Components/Profile/ProfileEdit.js'
import ProfileSettings from '../Components/Profile/ProfileSettings.js'
import Adopt from '../Components/Adopt/Adopt.js'
import Albums from '../Components/Albums/Albums.js'
import Business from '../Components/Business/Business.js'
import Friends from '../Components/Friends/Friends.js'
import Jobs from '../Components/Jobs/Jobs.js'
import Market from '../Components/Market/Market.js'
import Notification from '../Components/Notifications/Notifications.js'
import Messenger from '../Components/Messenger/Messenger.js'
import Blog from '../Components/Blog/Blog.js'

import '../Assets/css/dashboard.css'

function Dashboard(props) {
  const initialState = {
    loading: true,
    display: "feed",
    isLoggedIn: true,
    dashboardData: {
      followersNumbers: {
        following: 0,
        followers: 0
      },
      notifications: {
        notificationData: [],
        isNewNotifications: false
      },
      friends: [],
      masterFeed: [],
      isNewMessages: false,
      isItemsInCart: false
    }
  }
  
  const [state, setState] = useState(initialState)
  console.log(state)
  const changeDisplay = (v) => {
    setState({display: v})
  }

  const displayContent = () => {
    switch (state.display) {
      case "feed":
        return <Feed data={{changeDisplay: changeDisplay(this)}}/>
      case "profile":
        return <Profile data={{changeDisplay: changeDisplay(this)}}/>
      case "profileEdit":
        return <ProfileEdit data={{changeDisplay: changeDisplay(this)}}/>
      case "settings":
        return <ProfileSettings data={{changeDisplay: changeDisplay(this)}}/>
      case "adopt":
        return <Adopt data={{changeDisplay: changeDisplay(this)}}/>
      case "albums":
        return <Albums data={{changeDisplay: changeDisplay(this)}}/>
      case "business":
        return <Business data={{changeDisplay: changeDisplay(this)}}/>
      case "friends":
        return <Friends data={{changeDisplay: changeDisplay(this)}}/>
      case "jobs":
        return <Jobs data={{changeDisplay: changeDisplay(this)}}/>
      case "market":
        return <Market data={{changeDisplay: changeDisplay(this)}}/>
      case "notifications":
        return <Notification data={{changeDisplay: changeDisplay(this)}}/>
      case "messenger":
        return <Messenger data={{changeDisplay: changeDisplay(this)}}/>
      case "cart":
        return <Market data={{changeDisplay: changeDisplay(this)}}/>
      case "blog":
        return <Blog data={{changeDisplay: changeDisplay(this)}}/>
      default: 
        return <Feed data={{changeDisplay: changeDisplay(this)}}/>
    }
  }

  useEffect(() => {
    // Pull logged in user information from redux and start passing it to components
    let newState = { ...state, loading: false }
    console.log(newState)
    setState(newState)
  }, [])


  if (state.loading) {
    return (
      <div>
        <Loading/>
      </div>
    )
  } else {
    return (
      <div id="dashboardBackground">
        {/* <SearchBar 
          data={{changeDisplay: changeDisplay(this)}}
          newNotifications={state.dashboardData.notifications.isNewNotifications}
          newMessages={state.dashboardData.newMessages}
          itemsInCart={state.dashboardData.isItemsInCart}
          /> */}
        <SidebarLeft
          data={{changeDisplay: changeDisplay(this)}}
          userLoggedIn={state.isLoggedIn}
          />
        <SidebarRight data={{changeDisplay: changeDisplay(this)}}/>
        <div id="dashboardMainContent">
          { displayContent() }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Dashboard)