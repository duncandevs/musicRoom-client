import React , {Component} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'
import  SpotifyWebApi  from 'spotify-web-api-js'

export function getToken(id){
  return axios(`http://localhost:3000/users/${id}/token`)
}

export function getTrack(queryTerm,token){
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);
  return spotifyApi.searchTracks(queryTerm, {limit: 5})
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

export function saveUserPlaylistToDB(user_id,event_id,spotifyPlaylistId){

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

export function getEventByInvite(inviteCode){
  return axios(`http://localhost:3000/events/invite/${inviteCode}`)
}
