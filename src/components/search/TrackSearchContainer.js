import React , {Component} from 'react'
import axios from 'axios'
import TrackSearchForm from './TrackSearchForm'
import TrackSearchList from './TrackSearchList'
import TrackSearchListItem from './TrackSearchListItem'

export default class TrackSearchContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      queryTerm: '',
      tracks: []
    }
  }

  handleNewTracks(tracks){
    console.log('tracks: ', tracks)
    this.setState({
      tracks: tracks
    })
  }

  render(){
    return (
      <div>
        <TrackSearchForm handleNewTracks = { this.handleNewTracks.bind(this)} token={this.props.token}/>
        <TrackSearchList tracks={this.state.tracks} playlistOwner={this.props.playlistOwner} token={this.props.token}/>
      </div>
    )
  }
}
