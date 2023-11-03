import { reactive } from 'vue'
import { io } from 'socket.io-client'
import type SocketState from './types/socketState'

export const state: SocketState = reactive({
  connected: false,
  voteState: {
    one: 0,
    two: 0,
    three: 0
  }
})

export const socket = io('https://cuteness.vries.dev/', { upgrade: false, transports: ['websocket'] })

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('updateVoteState', (voteState) => {
  state.voteState = voteState
})
