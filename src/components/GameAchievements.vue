<template>
  <div class="achievements-container">
    <div class="achievements-grid">
      <div class="achievement-card"  v-for="achievement in achievements" :key="achievement.id"
           :class="{ 'unlocked': achievement.unlocked, 'locked': !achievement.unlocked, [achievement.id]: true }">
<!--        <img :src="achievement.image" :alt="achievement.title" class="achievement-icon">-->
        <div class="achievement-info">
          <h2>{{ t('achievements.' + achievement.id) }}</h2>
          <p>{{ t('achievements.' + achievement.id + '_d') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { achievements } from '@/services/achievements';
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {getStats, getUnlockedAchievements} from "@/services/wordService";
export default {
  setup(){
    const { t } = useI18n();
    const gameStats = ref(getStats());
    const unlockedAchievements = getUnlockedAchievements();

    achievements.map(a => {
      a.unlocked = typeof unlockedAchievements[a.id] !== 'undefined'
    });

    return {t, gameStats, achievements};
  }
}
</script>

<style scoped>
.achievements-container {
  width: 100%;
  text-align: center;
  padding: 20px 0;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.achievement-card {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.achievement-card.locked {
  opacity: 0.6;
}

.achievement-icon {
  width: 60px; /* Adjust size as needed */
  height: 60px; /* Adjust size as needed */
  margin: 10px; /* Provides space around the icon */
}
.unlocked .achievement-icon {
  filter: none; /* Full color for unlocked achievements */
}

.locked .achievement-icon {
  filter: grayscale(100%); /* Greyed out for locked achievements */
}


.achievement-info {
  flex-grow: 1;
  text-align: center;
}

h2 {
  font-size: 18px;
  color: #58468C;
}
p {
  font-size: 14px;
}

.achievement-card.unlocked {
  border-color: #58468C !important;
  background: #58468C;
}

.achievement-card.unlocked h2,
.achievement-card.unlocked p{
  color: #fffffd;
}

.achievement-card.unlocked.ghostly_guesser {
  border-color: #FF7518 !important;
  background: #FF7518;
}

.achievement-card.unlocked.holiday_spirit {
  border-color: #D32F2F !important;
  background: #D32F2F;
}
</style>
