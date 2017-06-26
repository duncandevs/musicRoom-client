import axios from 'axios'
import * as helpers from '../components/Helpers'

export function fetchProfile() {
  return function(dispatch) {
    dispatch({type: "ASYNC_START"});

    setTimeout(function(){
      axios.get("https://randomuser.me/api/").then( res => {
        let user = res.data.results[0];
        let firstName = user.name.first;
        let picture = user.picture.large;

        dispatch({type: "FETCH_PROFILE", payload: { firstName, picture } });
      });
    }, 1000);
  }
}

export function fetchEvent(path){
  return function(dispatch) {
    axios('http://localhost:3000'+path).then( res => {
      dispatch({type:'SET_EVENT_HOST',payload:{eventHost:res.data.eventHost}});
      dispatch({type:'FETCH_EVENT', payload:{event:res.data}});
    })
  }
}

export function fetchChatMessages(eventId){
  return function(dispatch){
    helpers.fetchChatMsgs(eventId).then( res => {
      dispatch({type:'FETCH_CHAT_MESSAGES',payload:{messages:res.data}})
    })
  }
}

export function setUser(path){
  return function(dispatch) {
    helpers.getUser(path).then(res => {
      dispatch({type:'FETCH_USER', payload:{user:res.data}})
    })
  }
}

export function setToken(id){
  return function(dispatch) {
    helpers.getToken(id).then(res => {
      dispatch({type:'SET_TOKEN', payload:{token:res.data.token}})
    })
  }
}

export function handleNewTracks(tracks){
  return function(dispatch){
    dispatch({type:'ADD_SEARCH_TRACKS',payload:{tracks:tracks}})
  }
}

export function dispatchNewGuestUser(user){
  return function(dispatch){
    dispatch({type:'ADD_NEW_GUEST_USER',payload:{user:user}})
  }
}

export function updateArtistInfo(params){
  return function(dispatch){
    helpers.getArtistsInfoByArtistId(params.token,params.artistSpotifyId).then((artist)=>{
      helpers.getArtistTopTracks(params.token, params.artistSpotifyId).then((topTracks)=>{
        dispatch({type:'UPDATE_ARTIST_INFO',
          payload: {
            aritstImg:artist.images[0].url,
            topTracks:topTracks.tracks,
            artistSpotifyId:params.artistSpotifyId
          }
        })
    })})
  }
}
