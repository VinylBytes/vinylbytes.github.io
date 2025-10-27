<template>
  <div class="content">
    <p class="quote">“The most common form of despair is not being who you are.”</p>
    <p class="author">Søren Kierkegaard</p>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.quote {
  font-size: 1.5em;
  max-width: 30em;
  text-align: center;
  padding: 1em;
  color: $text-color;
}

.author {
  font-size: 1.2em;
  text-align: center;
  margin-top: 0.5em;
  color: $text-color-secondary;
}

</style>
