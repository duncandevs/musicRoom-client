import React, {Component} from 'react'
import { addTracksToPlaylist, getToken } from '../../Helpers'
import { connect } from 'react-redux'
import * as actions from '../../../actions'

function SearchTrack(props){
  const { track } = props

  var handleClick = function(){
    addTracksToPlaylist(props.token,props.playlist.spotifyUserId, props.playlist.spotifyPlaylistId,[props.track.uri]).then(
      // props.addTrackToQueuedTracksList(track)
      props.updateArtistInfo({token:props.token,artistSpotifyId:track.artistSpotifyId})
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

export default connect(mapStateToProps,actions)(SearchTrack)

// // TODO: refactor the add track to queud track list state
// addTrackToQueuedTracksList(track){
//   this.props.newArtistSpotifyId(track.artistSpotifyId)
//   addTrackToDB(track).then((res)=>{
//     this.setState({
//       queuedTracks: [...this.state.queuedTracks,res.data]
//     })
//   })
// }
//
// newArtistSpotifyId(id){
//   this.updateInfo(id)
// }
//
//
// updateInfo(artistSpotifyId){
//   getArtistsInfoByArtistId(this.props.token,artistSpotifyId).then((artist)=>{
//     getArtistTopTracks(this.props.token, artistSpotifyId).then((tops)=>{
//       this.setState({
//         artistImg: artist.images[0].url,
//         topTracks: tops.tracks,
//         artistSpotifyId: artistSpotifyId
//       })
//     })
//   })
// }
