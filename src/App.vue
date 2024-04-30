<script setup lang="ts">
</script>

<template>
  <div class="content">
    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm5.495.93A.5.5 0 0 0 6.5 13c0 1.19.644 2.438 1.618 3.375C9.099 17.319 10.469 18 12 18c1.531 0 2.9-.681 3.882-1.625.974-.937 1.618-2.184 1.618-3.375a.5.5 0 0 0-.995-.07.764.764 0 0 1-.156.096c-.214.106-.554.208-1.006.295-.896.173-2.111.262-3.343.262-1.232 0-2.447-.09-3.343-.262-.452-.087-.792-.19-1.005-.295a.762.762 0 0 1-.157-.096ZM8.99 8a1 1 0 0 0 0 2H9a1 1 0 1 0 0-2h-.01Zm6 0a1 1 0 1 0 0 2H15a1 1 0 1 0 0-2h-.01Z" clip-rule="evenodd"/>
    </svg>
    <h1 class="heading">You just lost the game.</h1>
  </div>
</template>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Caladea:ital@1&family=Noto+Sans+Mono:wght@100;200;300;400;500;600;700;800;900&display=swap')

@font-face
  font-family: "Calibre"
  src: url("/fonts/Calibre-Medium.otf") format("opentype")

.content
  color: white
  align-items: center
  background-color: #000
  display: flex
  flex-direction: column
  height: 100vh
  justify-content: center
  overflow: hidden
  padding: 1rem
  position: relative
  width: 100vw
  z-index: 0

.heading 
  text-align: center
  padding: 1rem
  font-family: "Calibre"
  font-size: clamp(2.5rem,2.5vw,12rem)
  font-style: normal
  font-weight: 600
  line-height: 1

  @media screen and (min-width: 800px)
    font-size: clamp(3.5rem,3.5vw,12rem)

svg 
  width: 7rem
  margin: 3rem
</style>