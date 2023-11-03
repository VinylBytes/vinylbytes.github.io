import type VoteState from './voteState'

export default interface SocketState {
  connected: boolean
  voteState: VoteState
}
