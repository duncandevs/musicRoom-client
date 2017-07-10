import React , {Component} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'
import  SpotifyWebApi  from 'spotify-web-api-js'

export function getUser(userId){
  return axios({
    url: `http://localhost:3000${userId}`,
    method: 'get'
  })
}

export function getToken(id){
  return axios(`http://localhost:3000/users/${id}/token`)
}

export function getEventByInvite(params){
  return axios({
    url: 'http://localhost:3000/events/invite',
    method:'post',
    data: {
      username: params.username,
      inviteCode: params.inviteCode
    }
  })
}

export function addInvitedUser(params){
  return axios({
    url: 'http://localhost:3000/user',
    method: 'post',
    data: {
      username: params.username,
      guest: true
    }
  })
}

export function addTrackToDB(track){
  return axios({
    url: 'http://localhost:3000/tracks',
    method: 'post',
    data: {
      track: track,
      album: track.album,
      event_id: track.eventId
    }
  })
}

export function getTracksFromDB(){
  return axios('http://localhost:3000/tracks')
}

export function getEventTracksFromDB(eventId){
  return axios({
    url: 'http://localhost:3000/tracks/event',
    method: 'post',
    data: {
      event_id: eventId
    }
  })
}

export function addChatMsgToDB(params){
  return axios({
    url: `http://localhost:3000/users/${params.userId}/events/${params.eventId}/chatmsgs`,
    method: 'post',
    data: {
      message: params.message,
      user_id: params.userId,
      event_id: params.eventId
    }
  })
}

export function fetchChatMsgs(eventId){
  return axios(`http://localhost:3000/events/${eventId}/chatmsgs`)
}

export function setTrackVote(id, user){
  return axios({
    url: `http://localhost:3000/tracks/${id}/vote`,
    method: 'post',
    data: {
      user: user
    }
  })
}

export function setTrackUnVote(id, user){
  return axios({
    url: `http://localhost:3000/tracks/${id}/unvote`,
    method: 'post',
    data: {
      user: user
    }
  })
}

export function setDeviceInDB(deviceId,user_id){
  return axios({
    url: `http://localhost:3000/users/${user_id}/devices`,
    method:'post',
    data: {
      user_id: user_id,
      deviceId: deviceId
    }
  })
}

export function getDeviceFromDB(user_id){
  return axios({url: `http://localhost:3000/users/${user_id}/devices`})
}

export function setSpotifyUserInDB(spotifyUserId,user_id){
  return axios({
    url: `http://localhost:3000/users/${user_id}/spotifys`,
    method:'post',
    data: {
      spotifyUserId: spotifyUserId
    }
  })
}

export function getSpotifyUserFromDB(user_id){
  return axios({url: `http://localhost:3000/users/${user_id}/spotifys`})
}


export function getTrack(queryTerm,token){
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);
  return spotifyApi.searchTracks(queryTerm, {limit: 50})
}

export function getUserPlaylists(token){
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);
  return spotifyApi.getUserPlaylists()
}

export function createUserPlaylist(user_id,token,playlistName){
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);
  var options = {
    name: playlistName
  }
  return spotifyApi.createPlaylist(user_id,options)
}

export function addTracksToPlaylist(token,userProfileId, playlistId,uris){
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);
  return spotifyApi.addTracksToPlaylist(userProfileId,playlistId,uris)
}

export function getUserProfile(token){
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);
  return spotifyApi.getMe()
}

export function getPlaylistTracks(token,spotifyUserId, spotifyPlaylistId){
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);
  return spotifyApi.getPlaylistTracks(spotifyUserId,spotifyPlaylistId)
}

export function getMyDevices(token){
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);
  return spotifyApi.getMyDevices()
}

export function getSpotifyUser(token){
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token)
  return spotifyApi.getMe()
}

export function play(token,options){
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);
  return spotifyApi.play(options)
}

export function getPlaylistsFromSpotify(token,spotifyUserId,spotifyPlaylistId){
  getPlaylistTracks(token,spotifyUserId,spotifyPlaylistId).then((res)=>{
    var items = res.items
    var tracks = items.map((item)=>{
      return {
        name: item.track.name,
        artist: item.track.artists[0].name,
        cover: '',
        uri: item.track.uri,
        id: item.track.id,
        album: {
          name: item.track.album.name,
          uri: item.track.album.uri,
          image: ''
        }
      }
    })
  })
}

export function getArtistsInfoByArtistId(token,artistId){
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);
  return spotifyApi.getArtist(artistId)
}

export function getArtistTopTracks(token,artistId){
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);
  return spotifyApi.getArtistTopTracks(artistId,'US')
}

export function setSpotifyScopes(){
  const scopes = 'playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-read-recently-played user-read-private streaming user-modify-playback-state user-read-playback-state'
  const client_id = 'd2a6a11d756a4c4da594170cd80f425e'
  const redirect_uri = 'http://localhost:3000/spotify'
  const path = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri)
  return path
}

export function getMyCurrentPlaybackState(token){
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);
  return spotifyApi.getMyCurrentPlaybackState()
}
