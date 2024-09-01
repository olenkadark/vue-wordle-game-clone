<template>
  <div class="game">
    <app-header
        @new-game="newGame(true)"
        @open-stats="showStats = true"
        @open-settings="showSettings = true"
        @open-help="showHelp = true"
        @open-achievements="showAchievements = true"
    ></app-header>
    <div class="gameboard">
      <div v-for="(row, rowIndex) in gameData.guesses" :key="'row-' + rowIndex" class="word-row">
        <div v-for="(char, charIndex) in row" :key="'cell-' + rowIndex + '-' + charIndex"
             :class="cellClass(char, charIndex, rowIndex)">
          {{ char }}
        </div>
      </div>
    </div>
    <div class="keyboard">
      <div class="key-row" v-for="(row, index) in keyboard" :key="'row-' + index">
        <button
            v-for="key in row"
            :key="'key-' + key"
            :class="['key', gameData.letterStatus[key]]"
            @click="keyPress(key)"
        >
          <template v-if="key === 'Backspace'">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
            </svg>
          </template>
          <template v-else>
            {{ key }}
          </template>
        </button>
      </div>
    </div>
    <game-toast ref="toast" type="error" :message="error"></game-toast>
  </div>
  <modal :isVisible="showGameResult" @close="showGameResult = false" :title="t('message.game_result')">
    <div style="justify-content: center; display: flex; flex-direction: column; align-items: center;">
      <img v-if="gameData.status === 'WIN'" style="max-width: 200px; width: 100%;" src="./assets/images/you-win.png" alt="You Win">
      <p v-if="gameData.status === 'FAIL'">{{t('message.you_fail')}}</p>
      <h3 v-if="gameData.status === 'WIN'">{{t('message.you_win')}}</h3>
      <p>{{t('message.word')}}: <b>{{dailyWord}}</b></p>
      <game-stats ref="stats"></game-stats>
    </div>
  </modal>
  <modal :isVisible="showStats" @close="showStats = false" :title="t('message.game_statistics')">
    <game-stats ref="stats"></game-stats>
  </modal>
  <modal :isVisible="showHelp" @close="showHelp = false" :title="t('message.rules')">
    <game-rules ref="rules"></game-rules>
  </modal>
  <modal :isVisible="showAchievements" @close="showAchievements = false" :title="t('message.achievements')" :size="`xl`">
    <game-achievements ref="achievements"></game-achievements>
  </modal>
</template>

<script>
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import {
  checkAchievements,
  checkWordExists,
  gameCompleted,
  getDailyWord,
  getLocale,
  getProgress,
  getRandomWord,
  resetProgress,
  saveProgress,
  setLocale
} from "@/services/wordService.js";
import {keyboards} from "./i18n";
import Modal from "@/components/Modal.vue";
import GameToast from "@/components/GameToast.vue";
import GameStats from "@/components/GameStats.vue";
import AppHeader from "@/components/Header.vue";
import GameRules from "@/components/GameRules.vue";
import GameAchievements from "@/components/GameAchievements.vue";

export default {
  components: {Modal, AppHeader, GameToast, GameStats, GameRules, GameAchievements},
  computed: {
    keyboard() {
      return keyboards[this.currentLocale]
    }
  },
  data() {
    return {
      currentGuess: [],
      allowedGuessesCount: 6,
      error: '',
      animate: false,
      showGameResult: false,
      showStats: false,
      showSettings: false,
      showHelp: false,
      showAchievements: false,
    };
  },
  methods: {
    addLetter(letter) {
      if (this.currentGuess.length < 5 && this.currentGuessIndex < this.allowedGuessesCount && this.gameData.status === 'INPROGRESS') {
        this.currentGuess.push(letter);
        this.updateCurrentRow();
      }
    },
    removeLetter() {
      if( this.currentGuessIndex < this.allowedGuessesCount && this.gameData.status === 'INPROGRESS'){
        this.currentGuess.pop();
        this.updateCurrentRow();
      }
    },
    submitGuess() {
      if (this.gameData.status !== 'INPROGRESS' || this.currentGuessIndex >= this.allowedGuessesCount) return;
      if (this.currentGuess.length !== 5 ){
        this.showError(this.t('message.not_enough_letters'));
        return;
      }
      const formattedGuess = this.currentGuess.join('').toUpperCase();
      const exists = true || checkWordExists(formattedGuess);
      if (!exists) {
        this.showError(this.t('message.word_does_not_exist'));
        return;
      }
      this.gameData.guesses[this.currentGuessIndex] = [...this.currentGuess];
      this.currentGuess = [];
      this.currentGuessIndex++;
      this.error = '';
      this.animate = false;
      this.updateLetterStatus();
      if (formattedGuess === this.dailyWord) {
        this.gameData.status = 'WIN'
      }
      else if (this.currentGuessIndex === this.allowedGuessesCount) {
        this.gameData.status = 'FAIL'
      }
      this.saveProgress();
    },
    showError(error){
      this.error = error;
      this.animate = true; // Trigger animation
      this.$refs.toast.showToast();
      setTimeout(() => this.animate = false, 830);
    },
    updateCurrentRow() {
      this.gameData.guesses[this.currentGuessIndex] = Array(5).fill('').map((_, idx) => this.currentGuess[idx] || '');
    },
    keyPress(key) {
      if (key === 'Enter') {
        this.submitGuess();
      } else if (key === 'Backspace') {
        this.removeLetter();
      } else {
        this.addLetter(key);
      }
    },
    checkLetter(letter, index, guessIndex) {
      console.log('this.dailyWord', this.dailyWord);
      if( guessIndex >= this.currentGuessIndex) return '';
      const correctWordArray = this.dailyWord.split('');
      if (letter === correctWordArray[index]) {
        return 'correct';
      } else if (this.dailyWord.includes(letter)) {
        // To ensure that the letter is not counted more than once,
        // check that it's not correctly placed elsewhere in the same word at or before this index.
        let targetOccurrences = correctWordArray.filter(x => x === letter).length;
        let guessOccurrencesBefore = this.gameData.guesses[guessIndex].slice(0, index + 1).filter(x => x === letter).length;
        if (guessOccurrencesBefore > targetOccurrences) {
          return 'incorrect';
        }
        return 'wrong-place';
      } else {
        return 'incorrect';
      }
    },
    cellClass(letter, index, guessIndex){
      let cssClass = ['word-cell'];

      if(guessIndex === this.currentGuessIndex){
        if( letter !== ''){
          cssClass.push('current');
        }
        if( this.animate){
          cssClass.push('shake-animation');
        }
      }
      cssClass.push(this.checkLetter(letter, index, guessIndex));

      return cssClass;
    },
    updateLetterStatus() {
      const correctWordArray = this.dailyWord.split('');
      this.gameData.letterStatus = {}; // Reset for fresh calculation

      this.gameData.guesses.forEach(guess => {
        let localCorrect = [...correctWordArray]; // Local copy to manage repeated letters
        guess.forEach((char, index) => {
          if (!char) return; // Skip empty

          // First pass: Check for correct placements
          if (char === localCorrect[index]) {
            this.gameData.letterStatus[char] = 'correct';
            localCorrect[index] = null; // Remove from consideration
          }
        });

        guess.forEach((char) => {
          if (!char || this.gameData.letterStatus[char] === 'correct') return; // Skip if already marked correct

          // Second pass: Check if the letter is correct but misplaced
          if (localCorrect.includes(char)) {
            this.gameData.letterStatus[char] = 'wrong-place';
            localCorrect[localCorrect.indexOf(char)] = null; // Mark as used
          } else if (!this.gameData.letterStatus[char]) {
            // Mark as incorrect if not already marked in previous guesses
            this.gameData.letterStatus[char] = 'incorrect';
          }
        });
      });
    },
    saveProgress() {
      this.gameData.dateTime = new Date().toISOString();
      saveProgress(this.gameData);
      if( this.gameData.status !== 'INPROGRESS'){
        gameCompleted(this.gameData);
        checkAchievements();
        this.showGameResult = true;
      }
    }
  },
  created() {
    if( this.gameData.status !== 'INPROGRESS'){
      this.showStats = true;
    }
  },
  setup() {
    const { t, locale } = useI18n();

    const currentLocale = ref(getLocale());
    const dailyWord = ref('');
    const gameData = ref(getProgress());
    const currentGuessIndex = ref(0);

    const changeLanguage = () => {
      setLocale(currentLocale.value);
      locale.value = currentLocale.value;
    };
    const newGame = (random = false) => {
      if(random){
        dailyWord.value = getRandomWord();
        gameData.value = resetProgress();
      }else{
        dailyWord.value = getDailyWord();
        gameData.value = getProgress();
      }

      currentGuessIndex.value = gameData.value.guesses.findIndex((guess, index) => {
        return guess.join('') === '' || index === 5;
      });
    };
    changeLanguage();
    newGame();

    return { dailyWord, currentLocale, changeLanguage, newGame, t, gameData, currentGuessIndex};
  }
};
</script>
<style>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
}
.gameboard{
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.keyboard{
  width: 100%;
  max-width: 600px;
}
.word-row {
  display: grid;
  grid-template-columns: repeat(5, 4rem);
  gap: 5px;
  margin-bottom: 5px;
}
.word-cell {
  width: 4rem;
  height: 4rem;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}
.word-cell.current{
  border-color: black;
}
.word-cell.incorrect {
  background-color: gray;
  color: white;
}

.word-cell.wrong-place {
  background-color: orange;
  color: white;
}

.word-cell.correct {
  background-color: green;
  color: white;
}
.key-row {
  display: flex;
  justify-content: center;
  margin: 5px 0;
}
.key {
  height: 55px;
  margin: 2px;
  border: none;
  border-radius: 4px;
  background-color: #f0f0f0;
  font-size: 16px;
  color: #333;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.key.incorrect {
  background-color: gray;
  color: white;
}

.key.correct {
  background-color: green;
  color: white;
}
.key.wrong-place {
  background-color: orange;
  color: white;
}
.key:active {
  background-color: #ccc;
}
.error {
  color: red;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
}

.shake-animation {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

button {
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.375rem;
  border-radius: 0.5rem;
  align-items: center;
  display: inline-flex;
  background: transparent;
  border: none;
  touch-action: manipulation;
}
button:hover{
  background-color: rgb(229 231 235);
}
</style>