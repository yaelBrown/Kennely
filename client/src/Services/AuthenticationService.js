class AuthenticationService {
  isLoggedIn = () => {
    let token = localStorage.getItem("token")
    if (token) {
      if (jwt_decode(token).exp < Date.now() / 1000) {
        localStorage.clear()
        return false
      }
      return true
    } else {
      return false
    }
  }
}

export default new AuthenticationService();