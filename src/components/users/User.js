import React, { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router'
import { Switch, Route , Link} from 'react-router-dom';
import EventForm from '../events/EventForm'
import Event from '../events/Event'
import EventsList from '../events/EventsList'
import Token from '../Token'
import LoginSpotify from '../LoginSpotify'
import { getToken, isLoggedin, getTrack, getUserPlaylists, createUserPlaylist, addTracksToPlaylist} from '../Helpers'
import { connect } from 'react-redux'
import * as actions from '../../actions'


class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      name: '',
      user_id: undefined,
      events: []
    }
  }

  getUser(subUrl){
    return axios({
      url: `http://localhost:3000${subUrl}`, //subUrl = user/:user_id
      method: 'get'
    })
  }

  getEvents(user_id){
    return axios({
      url: `http://localhost:3000/users/${user_id}/events`,
      method: 'get'
    })
  }

  setUserState(data){
    this.setState({
      username: data.username,
      name: data.name,
      user_id: data.id
    })
  }

  setEventsState(data){
    this.setState({
      events: data
    })
  }

  handleNewEvent(newEvent){
    this.setState({
      events: [...this.state.events, newEvent]
    })
  }

  isLoggedin(){
    if(!sessionStorage.getItem('id')){
        return this.props.history.push('/login')
    }
  }

  componentWillMount(){
    this.isLoggedin()
  }

  componentDidMount(){
    //TODO: set the user properties using redux
    // this.props.setUser(this.props.match.url)

    this.getUser(this.props.match.url).then((res)=>{
      this.setUserState(res.data)
      return res.data.id
    }).then((user_id)=>{
      this.getEvents(user_id).then((res)=>{
        this.setEventsState(res.data)
      })
    })

    // getToken(sessionStorage.id).then((res) => {
    //   sessionStorage.token = res.data.token
    // })
  }

  render(){
    const scopes = 'playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-read-recently-played user-read-private streaming user-modify-playback-state user-read-playback-state'
    const client_id = 'd2a6a11d756a4c4da594170cd80f425e'
    const redirect_uri = 'http://localhost:3000/spotify'
    const path = 'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri)
    const userDisplay =
          <div>
            <div className='user-spotify-login'><a href = { path } >login to spotify</a></div>
            <EventsList events={this.state.events}/>
            <Link to={`/users/${this.state.user_id}/events/new`}><p>new event</p></Link>
            <Switch>
              <Route path='/users/:user_id/events/new' render={(user_id)=>
                <EventForm user_id={this.state.user_id} handleNewEvent = {this.handleNewEvent.bind(this)}/>} />
              <Route path = '/users/loginspotify' render = {() => <LoginSpotify/>}/>
            </Switch>
          </div>

    return (
      <div>
        { this.state.user_id ? userDisplay : '' }
      </div>
    )
  }
}

export default withRouter(connect(()=>{},actions)(User))
