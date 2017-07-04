import React , { Component } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { getToken, getArtistsInfoByArtistId, getArtistTopTracks } from '../Helpers'
import InfoWrapper from './info/InfoWrapper'
import PlaylistWrapper from './playlist/PlaylistWrapper'
import ChatWrapper from './chat/ChatWrapper'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Event extends Component {
  constructor(props){
    super(props)
    this.state = {
      artistSpotifyId:'',
      artistImg: '',
      topTracks: []
    }
  }

  updateInfo(artistSpotifyId){
    getArtistsInfoByArtistId(this.props.token,artistSpotifyId).then((artist)=>{
      getArtistTopTracks(this.props.token, artistSpotifyId).then((tops)=>{
        this.setState({
          artistImg: artist.images[0].url,
          topTracks: tops.tracks,
          artistSpotifyId: artistSpotifyId
        })
      })
    })
  }

  newArtistSpotifyId(id){
    this.updateInfo(id)
  }

  componentWillMount(){
    this.props.clearEvent()
  }

  componentDidMount(){
    this.props.fetchEvent(this.props.match.url)
  }

  componentDidUpdate(){
    if(this.props.token == '' || this.props.token == null || this.props.token == undefined){
      if(this.props.eventHost.id != undefined){
        console.log('eventHost: ', this.props.eventHost)
        this.props.setToken(this.props.eventHost.id)
        this.props.setDevice(this.props.eventHost.id)
      }
    } else {
      sessionStorage.token = this.props.token
    }
  }

  render(){
    return (
      <div className='EventWrapper'>
        <InfoWrapper artistSpotifyId={this.state.artistSpotifyId} artistImg={this.state.artistImg} topTracks={this.state.topTracks}/>
        <PlaylistWrapper newArtistSpotifyId={this.newArtistSpotifyId.bind(this)}/>
        <ChatWrapper/>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {event:state.event, eventHost:state.eventHost, token:state.token, user:state.user}
}

export default connect(mapStateToProps,actions)(withRouter(Event))
