import SpotifyWebApi from 'spotify-web-api-js'

const spotifyWebApi = ()=> {
  return new SpotifyWebApi();
}

const defaultState = {
  user: {},
  eventHost: {},
  messages: [],
  eventId: '',
  userId: 2,
  device_id2: 'a93dffbf0f4cb9c8c4e2908861376ca989034d17',
  device_id:'1cfbddd7dbf29d1f655f4f1f2e0a2c4734d2553e',
  spotifyUserId: 'dmaina92',
  spotifyPlaylistId: '7yqbEs3LFlkorYW7IYbaQJ',
  token:'',
  spotifyWebApi: spotifyWebApi(),
  event: {},
  playlist:{},
  searchTracks: [],
  artistInfo: {topTracks:[],artistImg:'', artistSpotifyId:''}
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

    case 'FETCH_USER':
      return updateObject(state,{user:action.payload.user})

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
