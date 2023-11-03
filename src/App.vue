<script setup lang="ts">
import { state, socket } from '@/socket'
import type Vote from '@/types/vote'
import { computed, ref } from 'vue'
import { uuidv4 } from '@/helpers/uuid'
import { getCookie, setCookie } from './helpers/cookies'

import Cutie from "@/components/cutie.vue"

let selected = ref(3)
let validVote = ref(false)

const validSelection = computed(() => {
  return selected.value != 3
})

const connected = computed(() => {
  return state.connected
})

const totalVotes = computed(() => {
  return state.voteState.one + state.voteState.two + state.voteState.three
})

const getClientId = () => {
  let clientId = getCookie('client-id')

  if (clientId == null) {
    clientId = uuidv4()
    setCookie('client-id', clientId, 1)
  }

  return clientId
}

const vote = () => {
  if((!validSelection.value) || validVote.value) return

  const clientId = getClientId()

  const voteRequest: Vote = {
    clientId,
    cutieId: selected.value
  }

  socket.emit('vote', voteRequest, (success: boolean) => {
    validVote.value = success
  })
}
</script>

<template>
  <div class="content">
    <div class="inner">
      <p class="heading with-dot">De <i>cuteness</i> award</p>
      <div class="cuties" v-show="connected">
        <Cutie v-model:selected="selected" :id="0" name="Anne Jaap" image-link="https://files.snakeware.nl/files/7/0/6/5/2/anne_jaap_strikwerda_01.jpg" :votes="state.voteState.one" :total-votes="totalVotes"></Cutie>
        <Cutie v-model:selected="selected" :id="1" name="Manon" image-link="https://files.snakeware.nl/files/9/9/5/5/2/manon_van_der_werf_02.jpg" :votes="state.voteState.two" :total-votes="totalVotes"></Cutie>
        <Cutie v-model:selected="selected" :id="2" name="Bradley" image-link="https://files.snakeware.nl/files/4/0/6/5/2/bradley_gerrits_01.jpg" :votes="state.voteState.three" :total-votes="totalVotes"></Cutie>
      </div>
      <button v-show="connected" :class="{disabled: (!validSelection) || validVote}" @click="vote">Stem</button>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Caladea:ital@1&family=Noto+Sans+Mono:wght@100;200;300;400;500;600;700;800;900&display=swap')

@font-face
  font-family: "Calibre"
  src: url("/fonts/Calibre-Medium.otf") format("opentype")

@keyframes visualMobile
  0%
    transform: rotate(0deg) translate(140%,80%)
  10%
    transform: rotate(10deg) translate(40%,80%)
  20%
    transform: rotate(0deg) translate(-10%,80%)
  30%
    transform: rotate(30deg) translate(-10%,70%)
  40%
    transform: rotate(40deg) translate(-60%,10%)
  50%
    transform: rotate(98deg) translate(-130%,-30%)
  60%
    transform: rotate(183deg) translate(-90%,-10%)
  70%
    transform: rotate(248deg) translate(-170%,-10%)
  80%
    transform: rotate(270deg) translate(-160%,10%)
  90%
    transform: rotate(289deg) translate(-150%,10%)
  100%
    transform: rotate(322deg) translate(-220%,10%)

@keyframes visualDesktop
  0%
      transform: rotate(0deg) translate(80%,80%)
  10%
      transform: rotate(10deg) translate(40%,80%)
  20%
      transform: rotate(0deg) translate(-30%,80%)
  30%
      transform: rotate(30deg) translate(-80%,80%)
  40%
      transform: rotate(60deg) translate(-65%,80%)
  50%
      transform: rotate(150deg) translate(-45%,80%)
  60%
      transform: rotate(190deg) translate(-65%,70%)
  70%
      transform: rotate(240deg) translate(-55%,70%)
  80%
      transform: rotate(270deg) translate(-60%,110%)
  90%
      transform: rotate(320deg) translate(-65%,50%)
  100%
      transform: rotate(1turn) translate(-95%,50%)
.content
  color: white
  align-items: center
  background-color: hsl(324, 80%, 18%)
  display: flex
  flex-direction: column
  height: 100vh
  justify-content: center
  overflow: hidden
  padding: 1rem
  position: relative
  width: 100vw
  z-index: 0
  &:before
    animation: visualMobile 40s ease-in-out infinite
    background: radial-gradient(hsl(359,80%,54%), transparent)
    border-radius: 50%
    content: ""
    filter: blur(75px)
    height: 90%
    opacity: .8
    pointer-events: none
    position: absolute
    width: 90%
    z-index: -1
  @media screen and (min-width: 800px)
    &:before
      animation: visualDesktop 40s ease-in-out infinite
      height: 70%
      width: 120%

.inner 
  height: 100%
  display: flex
  justify-content: space-evenly
  align-items: center
  flex-direction: column

.cuties
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  @media screen and (max-width: 800px)
    flex-direction: column
    padding: 0 2rem

.heading 
  text-align: center
  padding: 1rem
  font-family: "Calibre"
  font-size: clamp(2.5rem,2.5vw,12rem)
  font-style: normal
  font-weight: 600
  line-height: 1
  i
    font-family: "Caladea"
    font-style: italic
    font-weight: 400

  @media screen and (min-width: 800px)
    font-size: clamp(3.5rem,3.5vw,12rem)

button 
  color: white
  border: none
  background-color: hsl(359,80%,54%)
  padding: 0.6rem 3rem
  border-radius: 1.5rem
  font-family: "Caladea"
  font-size: 1.2rem
  font-style: normal
  font-weight: 100
  line-height: 1

  &:hover
    background-color: hsl(359,80%,40%)
    cursor: pointer

.disabled
  background-color: hsl(0,0%,40%)
  cursor: not-allowed

  &:hover
    background-color: hsl(0,0%,30%)
    cursor: not-allowed

</style>