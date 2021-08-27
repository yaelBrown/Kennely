import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames'
import { connect } from 'react-redux'
import Icon from "@iconify/react"
import LoadingCat from '../../Assets/img/LoadingCat.gif'
import FeedCreatePost from '../Feed/FeedCreatePost.js'
import FeedPost from '../Feed/FeedPost.js'
import catFace from '@iconify-icons/emojione/cat-face';
import dogFace from '@iconify-icons/emojione/dog-face';

import FeedService from '../../Services/FeedService.js'
import UserService from '../../Services/UserService.js'

import '../../Assets/css/feed.css'
import { addUsersToCache, addUserToCache, getUsersFromCache } from '../../Redux/Users/userActions'

class Feed extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      loading: false,
      adFrequency: 8,
      masterFeed: [],
      userCache: {},
      tabs: {
        activeTab: "1"
      }
    }
  }
  






// convert to functional component
// check if component can see state data, if so pull id
// once you have id make request for feed on backend (should this be in dashboard component ?)

















  componentDidMount() {
    // let res = await FeedService.getFeed()
    //   .then(data => {
    //     if (data.data) {
    //       let userObj = {}
    //       data.users.map((e) => {
    //         userObj[e._id] = e
    //       })
    //       let newState = {
    //         masterFeed: data.data,
    //         userCache: userObj
    //       }
    //       this.setState(newState)
    //     }
    //   })

    // this.getFeed()
  }

  async updateFeed() {
    this.getFeed()
  }

  async getFeed() {
    let res = await FeedService.getFeed()
    .then(data => {
      if (data.data) {
        let userObj = {}
        data.users.map((e) => {
          userObj[e._id] = e
        })
        let newState = {
          masterFeed: data.data,
          userCache: userObj
        }
        this.setState(newState)
      }
    })
  }

  generateFeed() {
    if (this.state.masterFeed === undefined) {
      return
    }
    let visibleFeed = []
    if (this.state.masterFeed.length === 0 || this.state.masterFeed.length === undefined) {
      return visibleFeed;
    }
    this.state.masterFeed.map((e, i) => {
      if (i % this.state.adFrequency == 0) visibleFeed.push(<FeedPost type="ad" data={e} />)
      e.name = this.state.userCache[e.authorId].name
      e.location = this.state.userCache[e.authorId].location
      e.profilePic = this.state.userCache[e.authorId].profilePic
      switch (e.postType) {
        case "text":
          visibleFeed.push(<FeedPost type="text" data={e} />)
          break;
        case "photo":
          visibleFeed.push(<FeedPost type="photo" data={e} />)
          break;
        case "video":
          visibleFeed.push(<FeedPost type="video" data={e} />)
          break;
        default:
          break;
      }
    })
    return visibleFeed;
  }

  setActiveTab(tabNum) {
    console.log(tabNum)
    this.setState({tab: {activeTab: tabNum}})
    console.log(this.state.tabs.activeTab)
  }

  toggle(tab) {
    console.log(this.state.tabs.activeTab)
    console.log(tab)
    if (this.state.tabs.activeTab != tab) {
      this.setState({tabs: { activeTab: tab }});
    }
  }

  examplePostText() {
    return {
      postId: 123456789,
      type: "text",
      mediaSrc: "",
      author: "Yael Money",
      date: 1616991380210,
      petsMentioned: [],
      comment: "First post on the site"
    }
  }

  examplePostPhoto() {
    return {
      postId: 123456789,
      type: "photo",
      mediaSrc: "",
      author: "Yael Money",
      date: 1616991380210,
      petsMentioned: [],
      comment: "Really cute photo"
    }
  }

  examplePostVideo() {
    return {
      postId: 123456789,
      type: "video",
      mediaSrc: "",
      author: "Yael Money",
      date: 1616991380210,
      petsMentioned: [],
      comment: "A cute video"
    }
  }

  render() {
    {
      if (this.state.loading) {
        return (
          <div id="feedLoader" className="dashboardContentPanels">
            <img src={LoadingCat} alt="loading cat" id="feedCat"/>
          </div>
        )
      } else {
        return (
          <div className="dashboardContentPanels">
            <FeedCreatePost data={{updateFeed: this.getFeed.bind(this)}}/>
            <Nav tabs>
            
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.tabs.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                <small>Everyone</small>
                </NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.tabs.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                <small>Friends</small>
                </NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.tabs.activeTab === '2' })}
                  onClick={() => { this.toggle('3'); }}
                >
                <Icon icon={dogFace}/>
                </NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.tabs.activeTab === '2' })}
                  onClick={() => { this.toggle('4'); }}
                >
                <Icon icon={catFace}/>
                </NavLink>
              </NavItem>

            </Nav>
      
            <TabContent activeTab={this.state.tabs.activeTab}>
              
              <TabPane tabId="1">
                <h4>1</h4>
              </TabPane>

              <TabPane tabId="2">
                <h4>2</h4>
              </TabPane>
              
              <TabPane tabId="3">
                <h4>3</h4>
              </TabPane>

              <TabPane tabId="4">
                <h4>4</h4>
              </TabPane>



            </TabContent>

            { this.generateFeed() }
            {/* <FeedPost data={this.examplePostText()}/>
            <FeedPost data={this.examplePostPhoto()}/>
            <FeedPost data={this.examplePostPhoto()}/>
            <FeedPost data={this.examplePostVideo()}/> */}
          </div>
        )
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)