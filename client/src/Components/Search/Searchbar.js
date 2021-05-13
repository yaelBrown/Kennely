import React, { Component } from 'react'
import Icon from "@iconify/react"
import cartIcon from '@iconify-icons/bi/cart'
import cartFill from '@iconify-icons/bi/cart-fill';
import messageOutlined from '@iconify-icons/ant-design/message-outlined'
import messageFilled from '@iconify-icons/ant-design/message-filled';
import notificationIcon from '@iconify-icons/carbon/notification'
import notificationNew from '@iconify-icons/carbon/notification-new'
import profileIcon from '@iconify-icons/gg/profile'

import '../../Assets/css/searchBar.css'

export default class Searchbar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      searchBarItems: [
        { name: "cart", icon: cartIcon },
        { name: "messenger", icon: messageOutlined },
        { name: "notifications", icon: notificationIcon },
        { name: "settings", icon: profileIcon }
      ],
      newNotifications: this.props.newNotifications,
      newMessages: this.props.newMessages,
      itemsInCart: this.props.itemsInCart
    }
  }
  
  render() {
    const renderSearchRightIcons = () => {
      let out = []
      this.state.searchBarItems.map((e) => {
        switch (e.name) {
          case "notifications":
            if (this.state.newNotifications) {
              out.push(<Icon key={e.name} icon={notificationNew} className="searchbarRightIcons" onClick={() => this.props.data.changeDisplay(e.name)}/>)
              break
            } else {
              out.push(<Icon key={e.name} icon={e.icon} className="searchbarRightIcons" onClick={() => this.props.data.changeDisplay(e.name)}/>)
              break
            }
          case "messenger":
            if (this.state.newMessages) {
              out.push(<Icon key={e.name} icon={messageFilled} className="searchbarRightIcons" onClick={() => this.props.data.changeDisplay(e.name)}/>)
              break
            } else {
              out.push(<Icon key={e.name} icon={e.icon} className="searchbarRightIcons" onClick={() => this.props.data.changeDisplay(e.name)}/>)
              break
            }
          case "cart":
            if (this.state.itemsInCart) {
              out.push(<Icon key={e.name} icon={cartFill} className="searchbarRightIcons" onClick={() => this.props.data.changeDisplay(e.name)}/>)
              break
            } else {
              out.push(<Icon key={e.name} icon={e.icon} className="searchbarRightIcons" onClick={() => this.props.data.changeDisplay(e.name)}/>)
              break
            }
          default: 
            out.push(<Icon key={e.name} icon={e.icon} className="searchbarRightIcons" onClick={() => this.props.data.changeDisplay(e.name)}/>)
            break
        }
      })
      return out;
    }

    return (
      <div id="searchBar">
        <div id="searchLeft" onClick={() => this.props.data.changeDisplay("feed")}>
          <h5>logo</h5>
        </div>
        <div id="searchMiddle">
          {/* <h3>searchbar</h3> */}
          <input 
            type="text" 
            placeholder="search"
            id="searchBarField"
            ></input>
        
        </div>
        <div id="searchRight">
          <Icon icon="bi:cart"/>
          { renderSearchRightIcons() }
        </div>
      </div>
    )
  }
}
