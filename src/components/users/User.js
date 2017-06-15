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
    // remove hard code on the play list name
    const playlistName = 'flatironSpotify'
    const user_id = 'dmaina92'
    // each playlist id is associated with an instance of a new event
    const playlist_id = '5PDMuGrM98DFletxpopw3B'
    //coming from get tracks
    const uris = ["spotify:track:5brMyscUnQg14hMriS91ks",'spotify:track:4KW1lqgSr8TKrvBII0Brf8','spotify:track:6C7RJEIUDqKkJRZVWdkfkH',"spotify:track:19a3JfW8BQwqHWUMbcqSx8","spotify:track:3nAq2hCr1oWsIU54tS98pL"]

    this.getUser(this.props.match.url).then((res)=>{
      this.setUserState(res.data)
      return res.data.id
    }).then((user_id)=>{
      this.getEvents(user_id).then((res)=>{
        this.setEventsState(res.data)
      })
    })

    getToken(sessionStorage.id).then((res) => {
      sessionStorage.token = res.data.token
    })

    // let token = sessionStorage.token
    // getTrack('kanye',token).then((res)=> console.log(res))
    // getUserPlaylists(token).then((res)=>console.log(res))
    // addTracksToPlaylist(token,user_id, playlist_id,uris).then((res)=>console.log('adding tracks: ',res))
  }

  render(){
    const scopes = 'playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative'
    const client_id = 'd2a6a11d756a4c4da594170cd80f425e'
    const redirect_uri = 'http://localhost:3000/spotify'
    const path = 'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri)
    const userDisplay =
          <div>
            <h2>username: {this.state.username}</h2>
            <h2>name: {this.state.name}</h2>
            <a href = { path }>login to spotify</a>

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

export default withRouter(User)
