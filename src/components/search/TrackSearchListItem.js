import React, {Component} from 'react'
import { getToken } from '../Helpers'
import { addTracksToPlaylist } from '../Helpers'

export default function TrackSearchListItem(props){
  const { track } = props

  var handleClick = function(){
    console.log('in tracks search list item with the following owner: ', props.playlistOwner, props)
    getToken(props.playlistOwner.user_id).then((res)=> {
      addTracksToPlaylist(res.data.token,props.playlistOwner.spotifyUserId, props.playlistOwner.spotifyPlaylistId,[props.track.uri])
    })
  }

    return (
      <div onClick={() => handleClick()}>
        <div>{ track.name}</div>
        <div>{ track.artist }</div>
        <div><img src ={`${track.cover}`} width={150}/></div>
        <div>{ track.id }</div>
        <div>{ track.uri }</div>
      </div>
    )
}





















// import React, {Component} from 'react'
// import { getToken } from '../Helpers'
// import { addTracksToPlaylist } from '../Helpers'
//
// export default function TrackSearchListItem(this.props) {
//   const track = props.track
//   const name = track.name
//   const artist =  track.artist
//   const cover = track.cover
//   const id = track.id
//   const uri = track.uri
//
//   let handleClick = function(){
//     console.log('in tracks search list item with the following owner: ', props.playlistOwner)
//     getToken(props.playlistOwner.user_id).then((res)=> {
//       console.log(res.data.token)
//       addTracksToPlaylist(res.data.token,props.playlistOwner.spotifyUserId, props.playlistOwner.spotifyPlaylistId,['spotify:track:5brMyscUnQg14hMriS91ks'])
//     })
//     // get add song to the playlist and queue it last
//     // add track to playlist
//     // addTracksToPlaylist(sessionStorage.token,sessionStorage.user_id, playlist_id,uris)
//   }
//
//   return (
//     <div onClick={() => handleClick()}>
//       <div>{ name}</div>
//       <div>{ artist }</div>
//       <div><img src ={`${cover}`} width={150}/></div>
//       <div>{ id }</div>
//       <div>{ uri }</div>
//     </div>
//   )
// }
