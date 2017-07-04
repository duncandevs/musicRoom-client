import React , { Component } from 'react'
import QueuedTracksList from './QueuedTracksList'
import QueuedTrack from './QueuedTrack'
import Player from './Player'
import { connect } from 'react-redux'

export default class PlaylistQueueContainer extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        <Player />
        <QueuedTracksList trackType="queued"/>
      </div>
    )
  }
}
