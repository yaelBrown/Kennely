import React, { Component } from 'react'
import Icon from "@iconify/react"

import feedIcon from '@iconify-icons/gg/feed';
import messageOutlined from '@iconify-icons/ant-design/message-outlined';
import friendsIcon from '@iconify-icons/whh/friends';
import albumsIcon from '@iconify-icons/ion/albums';
import animalIcon from '@iconify-icons/cil/animal';
import welcomeWriteBlog from '@iconify-icons/dashicons/welcome-write-blog';
import groceryOrSupermarket from '@iconify-icons/map/grocery-or-supermarket';
import workIcon from '@iconify-icons/bytesize/work';
import settingsLine from '@iconify-icons/clarity/settings-line';

import SidebarLeftLogin from './SidebarLeftLogin.js'
import SidebarLeftProfilePicture from './SidebarLeftProfilePicture.js'

import '../../Assets/css/dashboardSidebarLeft.css'

export default class SidebarLeft extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       sidebarItems: [
        { name: "Feed", icon: feedIcon},
        { name: "Messenger", icon: messageOutlined},
        { name: "Friends", icon: friendsIcon},
        { name: "Albums", icon: albumsIcon},
        { name: "Adopt", icon: animalIcon},
        { name: "Blog", icon: welcomeWriteBlog},
        { name: "Market", icon: groceryOrSupermarket},
        { name: "Jobs", icon: workIcon},
        { name: "Settings", icon: settingsLine},
      ]
    }
  }
  
  render() {
    const renderSidebarLeftTop = () => {
      if (this.props.userLoggedIn) {
        return <div onClick={() => this.props.data.changeDisplay("profile")} id="sidebarLeftProfilePictureIcon"><SidebarLeftProfilePicture/></div>
      } else {
        return <SidebarLeftLogin/>
      }
    }

    const renderMenuItems = () => {
      let out = []
      this.state.sidebarItems.map((e) => {
        return out.push(
          <tr key={e.name}>
            <td>
              {/* <span className="sidebarItemIcon">i</span> */}
              <Icon icon={e.icon} className="sidebarItemIcon"/> 
            </td>
            <td>
              <span 
                className="sidebarItemName"
                onClick={() => this.props.data.changeDisplay(e.name.charAt(0).toLowerCase() + e.name.substring(1))}>{e.name}</span>
            </td>
          </tr>
        )
      })
      return out
    }

    return (
      <div id="sidebarLeft">
        <div id="sidebarLeftTop">
          { renderSidebarLeftTop() }
        </div>
        <div id="sidebarLeftBottom">
          <table id="sidebarLeftBottomTable">
            <tbody>
              { renderMenuItems() }

            </tbody>
          </table>
        </div>
      </div>
    )
  }
}