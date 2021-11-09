import axios from 'axios'
import API_URL from '../Api/api.js'

const prefix = "dashboard"

class DashboardService {
  firstLoad = async (user_id) => {
    if (user_id === undefined || parseInt(user_id) === undefined) {
      return {}
    } else {
      return await axios.get(API_URL + prefix + `?user_id=${user_id}`) 
    }
  }
}

export default new DashboardService();