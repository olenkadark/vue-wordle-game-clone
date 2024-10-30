<template>
    <ul>
      <li>{{ t('message.total_games_played') }}: {{ gameStats.playedGames }}</li>
      <li>{{ t('message.total_wins') }}: {{ gameStats.countWins }}</li>
      <li>{{ t('message.win_percentage') }}: {{ gameStats.percentWins }}%</li>
    </ul>
</template>

<script>
import {useI18n} from "vue-i18n";
import {getStats} from "@/services/wordService";
import {ref} from "vue";

export default {
  setup(){
    const { t } = useI18n();
    const gameStats = ref(getStats());

    return {t, gameStats};
  }
}
</script>
