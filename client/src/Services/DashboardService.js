import axios from 'axios'
import API_URL from '../Api/api.js'

const prefix = "dashboard"

class DashboardService {
  firstLoad = async (user_id) => {
    if (user_id === undefined || parseInt(user_id) === undefined) {
      return {}
    } else {
      const config = { 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        data: JSON.stringify({
          "user_id": user_id
        })
      }

      console.log(config)

      return await axios.get(API_URL + prefix, config) 
    }
  }
}

export default new DashboardService();