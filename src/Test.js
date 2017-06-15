import React, {Component} from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import axios from 'axios'
export default class Test extends Component {
  componentDidMount(){
    axios('http://localhost:3000/').then((res)=>{
      console.log("api request successful: ", res)
    })
  }
  render(){
    return (
      <div></div>
    )
  }
}
