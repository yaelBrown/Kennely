// Class is used to manage the user cache in memory

import axios from 'axios'
import API_URL from '../Api/api.js'

const PREFIX = "users/"

class UserService {
  getUsers = async (unknownUsers) => {
    let config = {
      method: 'post',
      url: API_URL + PREFIX + "user",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      data: JSON.stringify({
        users: unknownUsers
      })
    }

    return await axios(config)
      .then(res => res.data)
      .then((res) => {
        if (res) {
          return res
        } else {
          console.error("unable to get users for cache")
          return false
        }
      })
      .catch((err) => {
        console.error(err)
        return false
      })
  }
}

export default new UserService();