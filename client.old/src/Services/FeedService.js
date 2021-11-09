import axios from 'axios'
import API_URL from '../Api/api.js'

const PREFIX = "feed/"

class FeedService {
  getFeed = async () => {
    let config = {
      method: 'get',
      url: API_URL + PREFIX, 
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }

    return await axios(config)
      .then(res => res.data)
      .then((res) => {
        if (res) {
          console.log(res)
          return res
        } else {
          console.error("unable to get feed")
          return false
        }
      })
      .catch((err) => {
        console.error(err)
        return false
      })
  }
}

export default new FeedService();