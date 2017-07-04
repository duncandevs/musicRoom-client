import React ,{ Component } from 'react'
import TrackSearchForm from './TrackSearchForm'
import axios from 'axios'
import { getToken , addTrackToDB, getTracksFromDB, getPlaylistTracks, getMyDevices, play,  getEventTracksFromDB} from '../../Helpers'
import PlaylistSearchContainer from './PlaylistSearchContainer'
import { withRouter } from 'react-router-dom'
import PlaylistQueueContainer from './PlaylistQueueContainer'
import {Switch, Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../../actions'

class PlaylistWrapper extends Component {
  constructor(props){
    super(props)
    this.state = {
      searching: false,
      initialTracksSet: false
    }
  }

  toggleSearch(toggle){
    this.setState({
      searching: toggle
    })
  }

  orderTracks(tracks){
    return tracks.sort((a,b) => b.voteCount - a.voteCount)
  }

  setInitialQueuedTracks(){
     getEventTracksFromDB(this.props.event.id).then((res)=>{
      this.props.setInitialQueuedTracks(this.orderTracks(res.data))
    })
  }

  setInitialState(){
    const token = this.props.token
    const event = this.props.event
    const playlist = event.playlists[0]

    this.setInitialQueuedTracks()
    this.setState({
      initialTracksSet: true
    })
  }

  getDevices(token){
    getMyDevices(token).then((res)=>{
      // console.log('my devices: ',res)
    })
  }

  componentDidUpdate(){
    if(Object.keys(this.props.event).length > 0 && !this.state.initialTracksSet && this.props.token != ''){
      this.getDevices(this.props.token)
      this.setInitialState()
    }
  }

  render(){
    const eventsPath = this.props.match.url
    const searchPath = eventsPath + '/search'
    const queuePath = eventsPath + '/queue'
    const display = ()=>{
      if(this.state.searching == false){
        return  <PlaylistQueueContainer/>
      } else {
        return <PlaylistSearchContainer toggleSearch={this.toggleSearch.bind(this)}/>
      }
    }
    return (
      <div className = 'PlaylistWrapper col-md-6'>
        <div className='row top-player-nav'>
          <div className='track-search-form col-md-8'><TrackSearchForm toggleSearch={this.toggleSearch.bind(this)}/></div>
          <div className='player-toggle-btn col-md-4'><button onClick={()=>this.toggleSearch(false)} className='btn btn-primary'>player</button></div>
        </div>
        { display() }
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return {token: state.token, event: state.event}
}

export default withRouter(connect(mapStateToProps,actions)(PlaylistWrapper))
