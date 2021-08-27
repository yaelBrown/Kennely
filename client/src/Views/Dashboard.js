import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

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

import DashboardService from '../Services/DashboardService.js'

import '../Assets/css/dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.props.user.id = 7    // For development purposes only
    this.state = {
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
  }
  
  changeDisplay(v) {
    this.setState({display: v})
  }

  displayContent() {
    switch (this.state.display) {
      case "feed":
        return <Feed data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      case "profile":
        return <Profile data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      case "profileEdit":
        return <ProfileEdit data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      case "settings":
        return <ProfileSettings data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      case "adopt":
        return <Adopt data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      case "albums":
        return <Albums data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      case "business":
        return <Business data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      case "friends":
        return <Friends data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      case "jobs":
        return <Jobs data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      case "market":
        return <Market data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      case "notifications":
        return <Notification data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      case "messenger":
        return <Messenger data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      case "cart":
        return <Market data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      case "blog":
        return <Blog data={{changeDisplay: this.changeDisplay.bind(this)}}/>
      default: 
        return <Feed data={{changeDisplay: this.changeDisplay.bind(this)}}/>
    }
  }

  componentDidMount() {
    DashboardService.firstLoad(this.props.user.id)
      .then(res => console.log(res))

      // This request is not working


    this.setState({loading: false})
  }

  render() {
    // if (this.props.user.isAuth) {
    if (true) {   // For development purposes only
      if (this.state.loading) {
        return (
          <div>
            <Loading/>
          </div>
        )
      } else {
        return (
          <div id="dashboardBackground">
            <SearchBar 
              data={{changeDisplay: this.changeDisplay.bind(this)}}
              newNotifications={this.state.dashboardData.notifications.isNewNotifications}
              newMessages={this.state.dashboardData.newMessages}
              itemsInCart={this.state.dashboardData.isItemsInCart}
              />
            <SidebarLeft
              data={{changeDisplay: this.changeDisplay.bind(this)}}
              userLoggedIn={this.state.isLoggedIn}
              />
            <SidebarRight data={{changeDisplay: this.changeDisplay.bind(this)}}/>
            <div id="dashboardMainContent">
              { this.displayContent() }
            </div>
          </div>
        )
      }
    } else {
      return (<Redirect to="/"/>)
    }

  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Dashboard)