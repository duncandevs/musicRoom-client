import React from 'react'
import QueuedTrack from './QueuedTrack'

export default function QueuedTracksList(props) {
  const displayTracks = props.tracks.map((track)=>{
    return <QueuedTrack track={track} reOrderTracks={props.reOrderTracks}/>
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
