import axios from 'axios';
import API_URL from '../Api/api.js';
import jwt_decode from "jwt-decode";

const PREFIX = "users/"

class RegisterService {
  validateInput = (field, input) => {
    switch(field) {
      case "name":
        return (input.length > 1 && input.length < 255) ? true : false;
      case "email":
        if (input.length > 5 && input.length < 255) {
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input)
        } else {
          return false;
        }
      case "password":
        return (input.length > 8 && input.length < 255) ? true : false;
      case "location":
        return (input.length > 1 && input.length < 255) ? true : false;
      case "gender":
        return (input === true || input === false) ? true : false;
      default: 
        return false;
    }
  }

  registerUser = async (user) => {
    let config = {
      method: 'POST',
      url: API_URL + PREFIX + "register",
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      data: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
        location: user.location,
        gender: user.gender,
        profilePic: user.profilePic
      })
    }

    return await axios(config)
      .then(res => res.data)
      .catch(error => console.error(error))
  }

  editUser = () => {
    return true
  }

  deleteUser = () => {
    return true
  }
}

export default new RegisterService();