<template>
  <header class="app-header">
    <img src="@/assets/logo.png" alt="App Logo" class="logo" />
    <nav>
      <button @click="newGame" class="icon-button">
        <img src="@/assets/reload-icon.svg" alt="New Game" />
      </button>
      <button @click="openStatsModal" class="icon-button">
        <img src="@/assets/stats-icon.svg" alt="Stats" />
      </button>
      <button @click="openAchievementsModal" class="icon-button">
        <img src="@/assets/images/achievement.png" alt="Achievements" />
      </button>
<!--      <button @click="openSettings" class="icon-button">
        <img src="@/assets/config-icon.svg" alt="Settings" />
      </button>-->
      <button @click="openHelp" class="icon-button">
        <img src="@/assets/help-icon.svg" alt="Help" />
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  methods: {
    openStatsModal() {
      this.$emit('open-stats');
    },
    openAchievementsModal() {
      this.$emit('open-achievements');
    },
    openSettings() {
      this.$emit('open-settings');
    },
    newGame() {
      this.$emit('new-game');
    },
    openHelp() {
      this.$emit('open-help');
    }
  }
}
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.logo {
  height: 38px; /* Adjust based on your logo's design */
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-left: 10px;
}

.icon-button img {
  height: 30px; /* Adjust based on your preference */
}
</style>
