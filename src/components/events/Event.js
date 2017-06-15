import React , { Component } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import TrackSearchContainer from '../search/TrackSearchContainer'
import { getToken } from '../Helpers'
class Event extends Component {
  constructor(props){
    super(props)
    this.state = {
      uri: '',
      playlistOwner: {},
      token:''
    }
  }

  fetchEvent(){
    return axios('http://localhost:3000'+this.props.match.url)
  }

  setInitialState(){
    this.fetchEvent().then((res)=>{
      let playlist = res.data.playlists[0]
      getToken(playlist.user_id).then((res)=>{
        this.setState({
          uri:  playlist.embed_uri,
          playlistOwner: {
            user_id: playlist.user_id,
            spotifyPlaylistId: playlist.spotifyId,
            spotifyUserId: playlist.embed_uri.split(':')[2]
          },
          token: res.data.token
        })
      })
    })
  }

  componentDidMount(){
    this.setInitialState()
  }

  render(){
    return (
      <div>
        <h2>Events Page</h2>
        <iframe src={`https://open.spotify.com/embed?uri=${this.state.uri}`} width="600" height="380" frameborder="0" allowtransparency="true"/>
        <TrackSearchContainer playlistOwner={this.state.playlistOwner} token={this.state.token}/>
      </div>
    )
  }
}

export default withRouter(Event)
