import React from 'react'
import QueuedTrack from './QueuedTrack'
import { connect } from 'react-redux'

function QueuedTracksList(props){
  const displayTracks = props.queuedTracks.map((track)=>{
    return <QueuedTrack track={track}/>
  })
  return (
    <div className='row'>
      <div className='QueuedTracksList'>
        <table>
          <tr>
              <th>TITLE</th>
              <th>ARTIST</th>
              <th>ALBUM</th>
              <th></th>
          </tr>
          {displayTracks}
        </table>
      </div>
   </div>
  )
}
const mapStateToProps = (state)=> {
  return {queuedTracks: state.queuedTracks}
}

export default connect(mapStateToProps)(QueuedTracksList)
