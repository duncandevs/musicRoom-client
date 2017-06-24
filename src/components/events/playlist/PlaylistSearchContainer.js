import React , {Component} from 'react'
import axios from 'axios'
import TrackSearchForm from './TrackSearchForm'
import TrackSearchList from './TrackSearchList'

export default class PlaylistSearchContainer extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <TrackSearchList playlist={this.props.playlist} token={this.props.token} addTrackToQueuedTracksList={this.props.addTrackToQueuedTracksList}/>
      </div>
    )
  }
}
