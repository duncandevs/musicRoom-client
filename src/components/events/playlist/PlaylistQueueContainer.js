import React , { Component } from 'react'
import QueuedTracksList from './QueuedTracksList'
import QueuedTrack from './QueuedTrack'
import Player from './Player'

export default class PlaylistQueueContainer extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        <Player />
        <QueuedTracksList trackType="queued" tracks={this.props.queuedTracks} reOrderTracks={this.props.reOrderTracks}/>
      </div>
    )
  }
}
