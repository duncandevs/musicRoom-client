import React , {Component} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'
import { getUserProfile, getMyDevices, setDeviceInDB, getMe, setSpotifyUserInDB, getSpotifyUser} from './Helpers'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Token extends Component {
  constructor(props){
    super(props)
    this.user_id = sessionStorage.id
    this.state = {
      devices: []
    }
  }

  createToken(token){
    return axios({
      url: `http://localhost:3000/users/${this.user_id}/token`,
      method: 'post',
      data: {
        token: token
      }
    })
  }

  createUserProfileID(profileId){
    return axios({
      url: `http://localhost:3000/users/${this.user_id}/profileId`,
      method: 'post',
      data: {
        profileId: profileId
      }
    })
  }

  selectDevice(device){
    setDeviceInDB(device.id,this.user_id).then((res)=>console.log('created device: ', res.data))
    this.createToken(this.state.token).then((res)=>{
      this.props.history.push(`/users/${this.user_id}`)
    })
  }

  componentDidMount(){
    const token = this.props.history.location.pathname.split('/token/')[1]
    const devices = getMyDevices(token).then((res)=>{
      this.setState({
        token: token,
        devices: res.devices
      })
    })
    const spotifyUser = getSpotifyUser(token).then((res)=>{
      setSpotifyUserInDB(res.id,this.user_id)
    })
  }

  render(){
    const displayDevices = this.state.devices.map((device)=>{
      return <div onClick={()=>this.selectDevice(device)}>{device.name}</div>
    })
    return(
      <div>
        <div>select device</div>
        <div>{displayDevices}</div>
      </div>
    )
  }
}

export default connect(state=>state,actions)(withRouter(Token))
