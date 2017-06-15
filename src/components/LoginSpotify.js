import React ,{Component} from 'react'
import axios from 'axios'

export default class LoginSpotify extends Component {
  constructor(props){
    super(props)
    this.user_id = sessionStorage.user_id
  }

  componentDidMount(){
    console.log('in Login Spotify')
    const path = 'https://accounts.spotify.com/en/authorize?client_id=d2a6a11d756a4c4da594170cd80f425e&response_type=code&redirect_uri=http:%2F%2Flocalhost:3000%2Fspotify'
    window.location.replace(path)
    // axios(`http://localhost:3000/users/${this.user_id}/loginspotify`).then((res)=>window.location.replace(path))
  }

  render(){
    return (
      <div></div>
    )
  }
}
