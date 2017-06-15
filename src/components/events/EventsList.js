import React , { Component } from 'react'
import EventListItem from './EventListItem'
import Event from './Event'
import {Route} from 'react-router-dom'

export default class EventsList extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const eventsDisplay = this.props.events.map((event)=> <EventListItem event={event}/>)
    return (
      <div>
        { eventsDisplay }
      </div>
    )
  }
}
