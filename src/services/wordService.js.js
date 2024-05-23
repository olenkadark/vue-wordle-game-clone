import { validWords } from "@/i18n";

const getDateNow = () => {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
};
const storeWordInLocalStorage = (word) => {
    const today = getDateNow();
    localStorage.setItem('dailyWord', JSON.stringify({ word, date: today }));
};


export const getDailyWord = () => {
    const storedWordData = localStorage.getItem('dailyWord');
    const today = new Date();
    const todaySlice = getDateNow();

    if (storedWordData) {
        const { word, date } = JSON.parse(storedWordData);
        if (date === todaySlice) {
            return word[getLocale()]; // Use the cached word if the date matches today
        }
    }

    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    let newWord = {};
    for (const [index, words] of Object.entries(validWords)) {
        newWord[index] = words[dayOfYear % words.length].toUpperCase();
    }
    storeWordInLocalStorage(newWord);
    return newWord[getLocale()];
};
export const getRandomWord = () => {
    const words = validWords[getLocale()];
    const randomIndex = Math.floor(Math.random() * words.length); // Generate a random index

    let newWord = {};
    for (const [index, words] of Object.entries(validWords)) {
        newWord[index] = words[randomIndex].toUpperCase();
    }
    storeWordInLocalStorage(newWord);
    return newWord[getLocale()];
};

export const checkWordExists = (word) => {
    const words = validWords[getLocale()];
    return  words.includes(word);
}

export const setLocale = (locale) => {
    localStorage.setItem('locale', locale);
}
export const getLocale = () => {
    let locale = localStorage.getItem('locale');
    if (!locale) {
        locale= 'ua';
        setLocale(locale);
    }
    return locale;
}
export const saveProgress = (gameData) => {
    if( typeof gameData.date === 'undefined'){
        const today = getDateNow();
        gameData = {
            date: today,
            data: gameData
        }
    }
    localStorage.setItem('gameData', JSON.stringify(gameData));
}
export const getProgress = () => {
    let gameData =  localStorage.getItem('gameData');
    const today  = getDateNow();

    if( gameData ){
        const { data, date } = JSON.parse(gameData);
        if (date === today) {
            return data;
        }
    }
    return resetProgress();
}


export const resetProgress = () => {
    const today  = getDateNow();
    const gameData = {
        date: today,
        data: {
            status : 'INPROGRESS',
            guesses : Array(6).fill(Array(5).fill('')),
            letterStatus: {}
        }
    }
    saveProgress(gameData);
    return gameData.data;
}



const saveStats = (gameStats) => {
    localStorage.setItem('gameStats', JSON.stringify(gameStats));
}

export const gameCompleted = (win) => {
    let gameStats = getStats();
    gameStats.playedGames++;
    if (win) {
        gameStats.countWins++;
    }

    if (gameStats.playedGames > 0 && gameStats.countWins > 0) {
        gameStats.percentWins = ((gameStats.countWins / gameStats.playedGames) * 100).toFixed(2);
    }
    saveStats(gameStats);
}

export const getStats = () => {
    let gameStats =  JSON.parse(localStorage.getItem('gameStats'));

    if( gameStats ){
        return gameStats;
    }
    gameStats = {
        playedGames: 0,
        countWins: 0,
        percentWins: 0
    }
    saveStats(gameStats);
    return gameStats;
}