import React, { Component } from 'react'

import RegisterService from '../../Services/RegisterService.js'
export default class Register extends Component {
  
  // Finished creating mock form to register users and test login
  // places auto complete for location. https://www.npmjs.com/package/use-places-autocomplete

  constructor(props) {
    super(props)
  
    this.state = {
       username: "",
       password: "",
       email: "",
       location: "",

    }
  }
  
  render() {
    return (
      <div>
        <h1>Register</h1>
      </div>
    )
  }
}
