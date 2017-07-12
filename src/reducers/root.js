import SpotifyWebApi from 'spotify-web-api-js'
import actionCable from 'actioncable'

const CableApp = {}
CableApp.cable = actionCable.createConsumer(`ws://${window.location.hostname}:3000/cable`)

const spotifyWebApi = ()=> {
  return new SpotifyWebApi();
}

const defaultState = {
  cableApp: CableApp,
  user: {},
  eventHost: {},
  messages: [],
  eventId: '',
  device_id:'1cfbddd7dbf29d1f655f4f1f2e0a2c4734d2553e',
  device:'',
  spotifyUserId: '',
  spotifyPlaylistId: '',
  token:'',
  spotifyWebApi: spotifyWebApi(),
  event: {},
  playlist:{},
  searchTracks: [],
  artistInfo: {topTracks:[],artistImg:'', artistSpotifyId:''},
  queuedTracks: [],
  infotoggle: false,
  playing:{}
}
const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case 'ADD_NEW_CHAT_MSG':
      var newMessages = addItemInArray(state.messages, {message:action.message, eventId:state.eventId, userId:state.userId})
      return updateObject(state,{messages: newMessages})

    case 'FETCH_CHAT_MESSAGES':
      return updateObject(state,{messages:action.payload.messages})

    case 'FETCH_EVENT':
      return updateObject(state,{event:action.payload.event})

    case 'FETCH_PLAYLIST':
      return updateObject(state,{playlist:action.payload.playlist})

    case 'SET_SPOTIFY_PLAYLIST_ID':
      return updateObject(state,{spotifyPlaylistId:action.payload})

    case 'SET_SPOTIFY_USER_ID':
      return updateObject(state,{spotifyUserId:action.payload})

    case 'FETCH_USER':
      return updateObject(state,{user:action.payload.user})

    case 'SET_USER':
      return updateObject(state,{user:action.payload})

    case 'ADD_SEARCH_TRACKS':
      return updateObject(state,{searchTracks:action.payload.tracks})

    case 'SET_EVENT_HOST':
      return updateObject(state,{eventHost:action.payload.eventHost})

    case 'SET_TOKEN':
      return updateObject(state,{token:action.payload.token})

    case 'ADD_NEW_GUEST_USER':
      return updateObject(state,{user:action.payload.user})

    case 'UPDATE_ARTIST_INFO':
      return updateObject(state,{artistInfo: action.payload})

    case 'ADD_TRACK_TO_QUEUEDTRACKLIST':
      var newTracks = addItemInArray(state.queuedTracks,action.payload)
      return updateObject(state,{queuedTracks: newTracks})

    case 'SET_INITIAL_QUEUED_TRACKS':
      return updateObject(state,{queuedTracks:action.payload})

    case 'SET_DEVICE':
      return updateObject(state,{device:action.payload})

    case 'CLEAR_EVENT':
      return updateObject(state,{event:{}})

    case 'CLEAR_ARTIST_INFO':
      return updateObject(state,{artistInfo: {topTracks:[],artistImg:'', artistSpotifyId:''}})

    case 'INFO_TOGGLE':
      return updateObject(state,{infotoggle:true})

    case 'SET_PLAYING_TRACK':
      return updateObject(state,{playing:action.payload})

    case 'CLEAR_PLAYING_TRACK':
      return updateObject(state,{playing:{}})

    case 'CLEAR_QUEUD_TRACKS':
      return updateObject(state,{queuedTracks:[]})

    default:
      return state
  }
  return state
}

function addItemInArray(array,item){
  return [...array, item]
}

function updateObject(oldObject,newValues){
  return Object.assign({},oldObject,newValues)
}

export default reducer
