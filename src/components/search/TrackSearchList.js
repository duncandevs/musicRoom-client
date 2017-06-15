import React, {Component} from 'react'
import TrackSearchListItem from './TrackSearchListItem'

export default function TrackSearchList(props) {
  var displayTracks = props.tracks.map((track)=><TrackSearchListItem track={track} playlistOwner={props.playlistOwner} token={props.token}/>)
  return (
    <div>
      { displayTracks }
    </div>
  )
}
