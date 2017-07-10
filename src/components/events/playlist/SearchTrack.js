import React, {Component} from 'react'
import { addTracksToPlaylist, getToken, addTrackToDB } from '../../Helpers'
import { connect } from 'react-redux'
import * as actions from '../../../actions'

function SearchTrack(props){
  const { track } = props

  var handleClick = function(){
    addTracksToPlaylist(props.token,props.spotifyUserId, props.spotifyPlaylistId,[props.track.uri]).then(
      props.updateArtistInfo({token:props.token,artistSpotifyId:track.artistSpotifyId})
    )
    addTrackToDB(track).then((res) => {
      props.addTrackToQueuedTracksList(res.data)
    })
    props.infotoggle()
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
  return {token: state.token, event:state.event, spotifyUserId:state.spotifyUserId, spotifyPlaylistId:state.spotifyPlaylistId}
}

export default connect(mapStateToProps,actions)(SearchTrack)
