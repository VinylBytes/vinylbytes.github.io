<template>
  <div class="content">
    <!-- Countdown or "It’s Birthday" message -->
    <div v-if="!isBirthday" class="countdown">
      <span class="number">{{ days }}</span><span class="label">D</span>
      <span class="number">{{ hours }}</span><span class="label">H</span>
      <span class="number">{{ minutes }}</span><span class="label">M</span>
      <span class="number">{{ seconds }}</span><span class="label">S</span>
    </div>
    <div v-else class="birthday-message">
      <h1>It is Jasper's birthday!</h1>
    </div>

    <!-- Troll pop-up (announcements) -->
    <div v-if="currentMessage" class="popup-message">
      {{ currentMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import confetti from 'canvas-confetti';

/** 1) SET DEBUG MODE HERE **/
const debug = false; // change to true to test quickly

/** 2) HARDCODED ANNOUNCEMENTS (original schedule) **/
const announcements = ref([
  {
    start: "2025-01-19T23:00:00+01:00",
    end:   "2025-01-19T23:02:00+01:00",
    message: "Breaking news: Jasper’s birthday is still not here. What a twist!"
  },
  {
    start: "2025-01-19T23:03:00+01:00",
    end:   "2025-01-19T23:04:00+01:00",
    message: "Quick question: Who’s forcing you to watch this clock?"
  },
  {
    start: "2025-01-19T23:05:00+01:00",
    end:   "2025-01-19T23:06:00+01:00",
    message: "Only 55 minutes left—go ahead, stretch it out. You’ve earned it."
  },
  {
    start: "2025-01-19T23:07:00+01:00",
    end:   "2025-01-19T23:08:00+01:00",
    message: "The suspense is killing me. Just kidding, I’m fine."
  },
  {
    start: "2025-01-19T23:09:00+01:00",
    end:   "2025-01-19T23:10:00+01:00",
    message: "Fun fact: You’re now 1 hour older than when you started waiting."
  },
  {
    start: "2025-01-19T23:11:00+01:00",
    end:   "2025-01-19T23:12:00+01:00",
    message: "This countdown has more drama than my last breakup."
  },
  {
    start: "2025-01-19T23:13:00+01:00",
    end:   "2025-01-19T23:14:00+01:00",
    message: "If patience is a virtue, you’re practically a saint by now."
  },
  {
    start: "2025-01-19T23:15:00+01:00",
    end:   "2025-01-19T23:16:00+01:00",
    message: "Spoiler: The birthday party is just as anticlimactic as this countdown."
  },
  {
    start: "2025-01-19T23:17:00+01:00",
    end:   "2025-01-19T23:18:00+01:00",
    message: "Are we having fun yet? No? Perfect."
  },
  {
    start: "2025-01-19T23:19:00+01:00",
    end:   "2025-01-19T23:20:00+01:00",
    message: "We’re almost halfway there! Just kidding, you’re stuck here forever."
  },
  {
    start: "2025-01-19T23:21:00+01:00",
    end:   "2025-01-19T23:22:00+01:00",
    message: "Scientists say time flies when you’re having fun. Weird how it’s crawling now."
  },
  {
    start: "2025-01-19T23:23:00+01:00",
    end:   "2025-01-19T23:24:00+01:00",
    message: "Somewhere, a clock is laughing at how seriously you’re taking this."
  },
  {
    start: "2025-01-19T23:25:00+01:00",
    end:   "2025-01-19T23:26:00+01:00",
    message: "Watching this countdown is *almost* as exciting as watching paint dry."
  },
  {
    start: "2025-01-19T23:27:00+01:00",
    end:   "2025-01-19T23:28:00+01:00",
    message: "Fun fact: Jasper probably forgot it’s his birthday."
  },
  {
    start: "2025-01-19T23:29:00+01:00",
    end:   "2025-01-19T23:30:00+01:00",
    message: "What if I told you this countdown resets at zero? Think about that."
  },
  {
    start: "2025-01-19T23:31:00+01:00",
    end:   "2025-01-19T23:32:00+01:00",
    message: "You’ve been here so long, you’re practically a historian of my birthday."
  },
  {
    start: "2025-01-19T23:33:00+01:00",
    end:   "2025-01-19T23:34:00+01:00",
    message: "Spoiler alert: There’s no cake waiting at the end of this."
  },
  {
    start: "2025-01-19T23:35:00+01:00",
    end:   "2025-01-19T23:36:00+01:00",
    message: "The real prize was the friends we made along the way. Except you’re alone."
  },
  {
    start: "2025-01-19T23:37:00+01:00",
    end:   "2025-01-19T23:38:00+01:00",
    message: "Jasper’s birthday: The world’s greatest mystery no one asked for."
  },
  {
    start: "2025-01-19T23:39:00+01:00",
    end:   "2025-01-19T23:40:00+01:00",
    message: "At this point, even the clock wants to go home."
  },
  {
    start: "2025-01-19T23:41:00+01:00",
    end:   "2025-01-19T23:42:00+01:00",
    message: "You’re now officially more committed to this countdown than I am."
  },
  {
    start: "2025-01-19T23:43:00+01:00",
    end:   "2025-01-19T23:44:00+01:00",
    message: "Fun fact: This countdown has been longer than most celebrity marriages."
  },
  {
    start: "2025-01-19T23:45:00+01:00",
    end:   "2025-01-19T23:46:00+01:00",
    message: "Still here? Don’t worry, your reward is eternal disappointment."
  },
  {
    start: "2025-01-19T23:47:00+01:00",
    end:   "2025-01-19T23:48:00+01:00",
    message: "Somewhere, there’s a person who missed their bus because of this countdown."
  },
  {
    start: "2025-01-19T23:49:00+01:00",
    end:   "2025-01-19T23:50:00+01:00",
    message: "You’ve almost made it. To what, though? Even I’m not sure."
  },
  {
    start: "2025-01-19T23:51:00+01:00",
    end:   "2025-01-19T23:52:00+01:00",
    message: "The tension is *almost* unbearable. Just kidding, it’s unbearable now."
  },
  {
    start: "2025-01-19T23:53:00+01:00",
    end:   "2025-01-19T23:54:00+01:00",
    message: "Are you crying yet? Don’t worry, that’s totally normal. Probably."
  },
  {
    start: "2025-01-19T23:55:00+01:00",
    end:   "2025-01-19T23:56:00+01:00",
    message: "Spoiler: Nothing happens at zero. Just a black hole of regret."
  },
  {
    start: "2025-01-19T23:57:00+01:00",
    end:   "2025-01-19T23:58:00+01:00",
    message: "Can you feel it? The thrill of absolutely nothing happening!"
  },
  {
    start: "2025-01-19T23:59:00+01:00",
    end:   "2025-01-19T23:59:59+01:00",
    message: "It’s finally here! Congrats, you waited an hour for this message."
  }
]);

/** 3) COUNTDOWN LOGIC 
 *    We'll store targetDate in a let so we can modify it if debug is on.
 */
let targetDate = new Date('2025-01-20T00:00:00+01:00').getTime();
const days = ref('00');
const hours = ref('00');
const minutes = ref('00');
const seconds = ref('00');
const isBirthday = ref(false);
let countdownInterval: number | undefined;

function formatNumber(num: number): string {
  return num < 10 ? '0' + num : num.toString();
}

function launchConfetti() {
  confetti({
    particleCount: 300,
    spread: 200,
    origin: { y: 0.6 }
  });
}

function updateCountdown() {
  const now = Date.now();
  const distance = targetDate - now;

  if (distance <= 0) {
    // Timer ended
    isBirthday.value = true;
    clearInterval(countdownInterval);
    launchConfetti(); // Party time
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

/** 4) TROLL POP-UP LOGIC **/
const currentMessage = ref('');

function checkAnnouncements() {
  const now = Date.now();
  const found = announcements.value.find(ann => {
    const startMs = new Date(ann.start).getTime();
    const endMs = new Date(ann.end).getTime();
    return now >= startMs && now <= endMs;
  });
  currentMessage.value = found ? found.message : '';
}

let trollInterval: number | undefined;

/**
 * 5) If debug is true, shift times so you can run through them quickly.
 *    - We'll schedule each announcement to appear for ~3 seconds, one after another.
 *    - Then we set the countdown to ~some seconds after the final announcement.
 */
if (debug) {
  onMounted(() => {
    // Start everything 2 seconds from now, so you have time to load the page
    const startOffset = Date.now() + 2000; 
    // Each announcement is 3 seconds long, with no gap, but you can adjust.
    const announcementDuration = 3000;

    // Rearrange each announcement to run sequentially
    announcements.value.forEach((ann, index) => {
      const thisStart = startOffset + (index * announcementDuration);
      const thisEnd   = thisStart + announcementDuration - 1; 
      ann.start = new Date(thisStart).toISOString();
      ann.end   = new Date(thisEnd).toISOString();
    });

    // After all announcements end, set the birthday moment for a bit after 
    // (e.g. 3s after final announcement)
    const finalTime = startOffset + announcements.value.length * announcementDuration;
    targetDate = finalTime + 3000;
  });
}

/** 6) LIFECYCLE HOOKS **/
onMounted(() => {
  // Start countdown
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);

  // Start troll checks
  checkAnnouncements();
  trollInterval = setInterval(checkAnnouncements, 1500); // faster checks in debug if you like
});

onBeforeUnmount(() => {
  if (countdownInterval) clearInterval(countdownInterval);
  if (trollInterval) clearInterval(trollInterval);
});
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

.content {
  position: relative;
}

/* Countdown styling */
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

/* Birthday message styling */
.birthday-message {
  font-family: 'Nunito', sans-serif;
  color: #fff;
  text-align: center;

  h1 {
    font-size: 2rem;
    margin-top: 2rem;
  }
}

/* Troll pop-up styling */
.popup-message {
  font-family: 'Nunito', sans-serif;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 90%;
  padding: 1rem;
  border-radius: 8px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  font-size: 1.1rem;
  z-index: 9999;
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>
