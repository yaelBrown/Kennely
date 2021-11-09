import axios from 'axios'
import API_URL from '../Api/api.js'
import jwt_decode from "jwt-decode";

const PREFIX = "users/"

class LoginService { 
  login = async (email, password, rememberMe) => {
    let config = {
      method: 'post',
      url: API_URL + PREFIX + "login",
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      data: JSON.stringify({
        email,
        password,
        rememberMe
      })
    };

    return await axios(config)
      .then(res => res.data)
      .then((res) => {
        if (res) {
          console.log(res)
          localStorage.setItem("token", res.token)
          console.log(res.user)
          return res.user
        } else {
          console.error("unable to login")
          return false
        }
      })
      .catch((error) => {
        console.error(error)
        return false
      });
  }

  logout = () => {
    return true
  }
}

export default new LoginService();