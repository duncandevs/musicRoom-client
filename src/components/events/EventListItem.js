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
        <Link to={`/events/${id}`}>
          <div className='event-list-item row'>
            <h3 className='event-list-title col-md-8'>{name}</h3>
            <div className='event-list-rightPanel col-md-4'>
              <div className='event-list-attendance'>0</div>
              <img src='https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-user-30.png&r=0&g=0&b=0' width='40px' className='event-list-people'/>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}
