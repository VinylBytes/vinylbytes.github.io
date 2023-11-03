<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  name: { type: String, required: true },
  id: { type: Number, required: true},
  imageLink: { type: String, required: true },
  votes: { type: Number, required: true },
  totalVotes: { type: Number, required: true },
  selected: { type: Number, required: true}
})

const width = computed(() => {
    if (props.votes > 0 && props.totalVotes > 0) return (props.votes/props.totalVotes)*100
    else return 0
})

defineEmits(['update:selected'])

const isSelected = computed(() => {
    return props.selected === props.id
})
</script>

<template>
    <div class="cutie" :class="{ selected: isSelected }" @click="$emit('update:selected', props.id)">
        <div class="image">
            <img :src="props.imageLink" alt="">
            <div class="loader" :style="{width: width +'%'}"></div>
        </div>
        <div class="info">
            <p class="with-dot">{{ props.name }}</p>
            <p class="votes">{{ props.votes < 10 ? "0" + props.votes : props.votes }}</p>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.selected
    background-color: hsl(324, 80%, 8%)
.loader
    background-color: white
    border-bottom: 3px solid hsl(359,80%,54%)
    height: 0.8rem
    border-radius: 2px
    transition: all 1s
.cutie
    margin: 1rem
    padding: 1rem
    width: 100%
    max-width: 30rem
    border-radius: 10px
    transition: background-color 0.5s

img
    width: 100%
p
    text-align: center
    padding: 1rem
    font-family: "Calibre"
    font-style: normal
    font-weight: 400
    font-size: 2rem
    line-height: 1

.votes
    padding-top: 0
    font-family: "Caladea"
    font-size: 4rem
    font-style: italic
    color: #D9D9D9

@media screen and (max-width: 800px)
    p
        font-size: 1.3rem
        text-align: right

    .votes
        font-size: 2rem

    .cutie
        margin: 0 0 1rem 0
        display: flex
        justify-content: center
        align-items: center
        max-width: 35vh

        .image
            flex-basis: 50%
        .info
            flex-basis: 50%

</style>