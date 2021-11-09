import React, { Component } from 'react'

import '../../Assets/css/profileSettings.css'
import SidebarLeftProfilePicture from '../../Assets/img/userPlaceholder.jpg'

// Used to edit settings for the using profile. For example, changing password and email etc.
export default class ProfileSettings extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      profileImage: SidebarLeftProfilePicture,
      prevUserState: {},
      user: {
        name: "Cookies",
        email: "email@email.com",
        location: "San Antonio, Texas",
        password: ""
      }
    }
  }
  
  componentDidMount() {
    console.log("profile settings mounted")
  }

  handleChange() {
    
  }

  handleSave() {
    console.log("Save was clicked")
  }

  handleChangePassword() {
    console.log("Change password was clicked")
  }

  handleLogout() {
    console.log("Logout was clicked")
  }

  handleDelete() {
    console.log("Delete account was clicked")
  }
  
  identifyChanges() {
    const k1 = Object.keys(this.state.user)
    const v1 = Object.values(this.state.prevUserState)
    const v2 = Object.values(this.state.user)

    const len = v2.length
    
    let out = {}
    for (let i = 0; i < len; i++) {
      if (v1[i] != v2[i]) {
        out[k1[i]] = v2[i]
      }
    }

    return out
  }

  render() {


    return (
      <div id="ps" className="dashboardContentPanels">
        <h2>Profile Settings</h2>
        <table>
          <tbody className="bborder">
            <tr>
              <td>
                <img src={this.state.profileImage} alt="profile image" id="psProfileImage"/>
              </td>
              <td className="bborder">
                
                <div className="psRow">
                  <div className="psLabels">
                    <label>Name: </label>
                  </div>
                  <input className="psInputs" value={this.state.user.name}/>
                </div>
                
                <div className="psRow">
                  <div className="psLabels">
                    <label>Email: </label>
                  </div>
                  <input className="psInputs" value={this.state.user.email}/>
                </div>
                
                <div className="psRow">
                  <div className="psLabels">
                    <label>Location: </label>
                  </div>
                  <input className="psInputs" value={this.state.user.location}/>
                </div>

              </td>
              <td>
                <button onClick={() => this.handleSave()}>Save Settings</button><br/>
                <button onClick={() => this.handleChangePassword()}>Change Password</button><br/>
                <button onClick={() => this.handleLogout()}>Logout</button><br/>
                <button onClick={() => this.handleDelete()}>Delete account</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
