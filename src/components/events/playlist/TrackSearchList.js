import React, {Component} from 'react'
import SearchTrack from './SearchTrack'
import { connect } from 'react-redux'

function TrackSearchList(props) {
  var displayTracks = props.tracks.map((track)=><SearchTrack track={track} playlist={props.playlist} addTrackToQueuedTracksList = {props.addTrackToQueuedTracksList}/>)
  return (
    <div className='row'>
      <div className='searchlist-container'>
        <table>
          <tr>
              <th>TITLE</th>
              <th>ARTIST</th>
              <th>ALBUM</th>
              <th></th>
          </tr>
          { displayTracks }
        </table>
      </div>
    </div>
  )
}

const mapStateToProps = (state)=>{
  return {tracks: state.searchTracks}
}

export default connect(mapStateToProps)(TrackSearchList)
