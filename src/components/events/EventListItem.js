import React , { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Event from './Event'

export default class EventListItem extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const name = this.props.event.name
    const id = this.props.event.id

    return (
      <div>
        <Link to={`/events/${id}`}><h3>{name}</h3></Link>
        <h3>{id}</h3>
      </div>
    )
  }
}
