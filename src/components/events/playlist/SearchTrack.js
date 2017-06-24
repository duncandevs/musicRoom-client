import React, {Component} from 'react'
import { addTracksToPlaylist, getToken } from '../../Helpers'
import { connect } from 'react-redux'

function SearchTrack(props){
  const { track } = props

  var handleClick = function(){
    //TODO: handle tracks from the event
    //get the track event.id and send it over in the request
    //use the event id to set an association in the back extends
    //get all tracks with a specific route that grabs all the event tracks and sets them to the queried list
    addTracksToPlaylist(props.token,props.playlist.spotifyUserId, props.playlist.spotifyPlaylistId,[props.track.uri]).then(
      props.addTrackToQueuedTracksList(track)
    )
  }

  return (
    <tr>
      <td>{ track.name}</td>
      <td>{ track.artist }</td>
      <td>{track.album.name}</td>
      <td><span className='addTrackBtn' onClick={() => handleClick()}><img src={require('./addTrackBlack.png')} width='15px'/></span></td>
    </tr>
  )
}

const mapStateToProps = (state) => {
  return {token: state.token, event:state.event}
}

export default connect(mapStateToProps)(SearchTrack)
