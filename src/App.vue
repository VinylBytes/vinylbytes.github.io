<script setup lang="ts">
import { ref, onMounted } from 'vue';

const days = ref('00');
const hours = ref('00');
const minutes = ref('00');
const seconds = ref('00');
const targetDate = new Date('January 20, 2025 00:00:00').getTime();

function formatNumber(num: number): string {
  return num < 10 ? "0" + num : num.toString();
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    days.value = '00';
    hours.value = '00';
    minutes.value = '00';
    seconds.value = '00';
    return;
  }

  const daysValue = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hoursValue = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesValue = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secondsValue = Math.floor((distance % (1000 * 60)) / 1000);

  days.value = formatNumber(daysValue);
  hours.value = formatNumber(hoursValue);
  minutes.value = formatNumber(minutesValue);
  seconds.value = formatNumber(secondsValue);
}

let intervalId: number;

onMounted(() => {
  updateCountdown();
  intervalId = setInterval(updateCountdown, 1000);
});
</script>

<template>
  <div class="content">
    <div class="countdown">
      <span class="number">{{ days }}</span><span class="label">D</span>
      <span class="number">{{ hours }}</span><span class="label">H</span>
      <span class="number">{{ minutes }}</span><span class="label">M</span>
      <span class="number">{{ seconds }}</span><span class="label">S</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

.countdown {
  font-family: 'Nunito', sans-serif;
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.number {
  font-size: clamp(3rem, 11vw, 8rem);
}

.label {
  font-size: clamp(1.2rem, 3.5vw, 2rem);
  opacity: 0.8;
}
</style>