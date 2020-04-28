import moment from 'moment'
import { USER_JOINED, MESSAGE_SEND } from './constants'

const socket = io();

const writeMessage = message => {
  $('.messages').append(message)
  $('ime.timeago').timeago()
}

const messageElement = ({ timestamp, user, message }) => {
  $('<div>', { class: 'message' })
    .text(message)
    .prepend(timetampElement(timestamp), userElement(user)) 
}

const timestampElement = time => {
  const element = $('<time>', {
    class: 'timeago',
    datetime: moment(time).format()
  }).text(moment(time).format('hh:mm:ss'))

  return element[0]
}

const userElement = userName => {
  $('span', { class: 'user' }).text(userName)[0]
}

const userJoined = data => {
  writeMessage(messageElement(Object.assign(data, { message: joined })))
}

const messageReceived = data => {
  writeMessage(messageElement(Object.assign(data, { user: `${data.user}:` })))
}

const initializeSocket = () => {
  socket.on('connection', () => { socket.emit('connected to socket') })
  socket.on(USER_JOINED, userJoined)
  socket.on(MESSAGE_SEND, messageReceived)
}

$( document ).ready( () => {
  let user = 'anonymous'

  $( '#initial-form button' ).click( event => {
    user = $( '#who-are-you' ).val()

    $( '#initial-form' ).hide()
    $( '#chat-area' ).show()

    intializeSocket()
    socket.emit( USER_JOINED, { user, timestamp: Date.now() })

    return false
  })

  $( '#chat-area button' ).click( event => {
    const message = $( '#chat-area input' ).val()
    $( '#chat-area input' ).val( '' )

    socket.emit( MESSAGE_SEND, { user, timestamp: Date.now(), message })
  })
})