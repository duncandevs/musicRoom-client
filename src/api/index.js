// get request to the a specific room
// returns the room name and id
import axios from 'axios'

export function getRoom(){
  axios.get('http://localhost:3000/users/1/rooms/1').then((res)=>{
    console.log("server response: ", res)
  })
}

export function createUser(){
  console.log("in createUser")
}
