import React , {Component} from 'react'
import axios from 'axios'
import { getTrack } from '../Helpers'

export default class TrackSearchForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      queryTerm: ''
    }
  }

  handleChange(e){
    this.setState({
      queryTerm: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    getTrack(this.state.queryTerm,this.props.token).then((res)=>{
      var tracks =  res.tracks.items.map((track)=>{
        return {
          name: track.name,
          artist: track.artists[0].name,
          cover: track.album.images[0].url,
          uri: track.uri,
          id: track.id
        }
      })
      this.props.handleNewTracks(tracks)
    })
  }

  componentDidMount(){
    console.log('token: ', this.props.token)
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          search for track
          <input value={this.state.queryTerm} onChange={this.handleChange.bind(this)}/>
          <input type='submit'/>
        </form>
      </div>
    )
  }
}
