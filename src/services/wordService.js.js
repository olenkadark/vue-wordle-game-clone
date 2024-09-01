import { validWords } from "@/i18n";
import { achievements } from '@/services/achievements';

const getDateNow = () => {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
}
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
    if( typeof gameData.startTime === 'undefined'){
        gameData.startTime = new Date().toISOString();
    }
    localStorage.setItem('gameData', JSON.stringify(gameData));
}
export const getProgress = () => {
    let gameData =  localStorage.getItem('gameData');
    const today  = getDateNow();

    if( gameData ){
        gameData = JSON.parse(gameData);
        if (typeof gameData.startTime !== 'undefined' && gameData.startTime.slice(0, 10) === today) {
            return gameData;
        }
    }
    return resetProgress();
}


export const resetProgress = () => {
    const gameData = {
        status : 'INPROGRESS',
        guesses : Array(6).fill(Array(5).fill('')),
        letterStatus: {},
        startTime : new Date().toISOString(),
    }
    saveProgress(gameData);
    return gameData;
}
export const checkAchievements = () => {
    const gameStats = getStats();
    const unlockedAchievements = getUnlockedAchievements();
    const date= new Date();
    console.log(gameStats);

    if( unlockedAchievements.length === achievements.length) return;

    achievements.forEach(achievement => {
        if (typeof unlockedAchievements[achievement.id] === 'undefined' && achievement.validate(gameStats)){
            unlockedAchievements[achievement.id] = date.getUTCDate();
        }
    });
    saveUnlockedAchievements(unlockedAchievements);
}
export const getUnlockedAchievements = () => {
    let unlockedAchievements =  JSON.parse(localStorage.getItem('unlockedAchievements'));

    if( unlockedAchievements ){
        return unlockedAchievements;
    }
    unlockedAchievements = {};
    saveUnlockedAchievements(unlockedAchievements);
    return unlockedAchievements;
}
const saveUnlockedAchievements = (unlockedAchievements) => {
    localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
}
const saveStats = (gameStats) => {
    localStorage.setItem('gameStats', JSON.stringify(gameStats));
}
export const gameCompleted = (gameData) => {
    let gameStats = getStats();
    if( typeof gameStats.gamesData === 'undefined') {
        gameStats.gamesData = [];
    }
    gameStats.gamesData.push(gameData);

    gameStats.playedGames  = gameStats.gamesData.length;
    gameStats.countWins    = gameStats.gamesData.filter(data => data.status === 'WIN').length;
    gameStats.nightPuzzles = gameStats.gamesData.filter(data => {
        const date= new Date(data.dateTime);
        const hours = date.getUTCHours();
        return hours >= 0 && hours < 5;
    }).length;
    gameStats.morningPuzzles = gameStats.gamesData.filter(data => {
        const date= new Date(data.dateTime);
        const hours = date.getUTCHours();
        return hours >= 5 && hours < 8;
    }).length;
    if (gameStats.playedGames > 0 && gameStats.countWins > 0) {
        gameStats.percentWins = ((gameStats.countWins / gameStats.playedGames) * 100).toFixed(2);
    }
    saveStats(gameStats);
    updateStreak();
    updateConsecutiveDays();
}
export const updateConsecutiveDays = () => {
    let gameStats = getStats();

    let dates = gameStats.gamesData.map(obj => obj.dateTime.slice(0, 10));
    let uniqueDates = [...new Set(dates)];

    if( uniqueDates.length){
        let date1 = getDateNow();
        uniqueDates.reverse();

        for (let date2 of uniqueDates) {
            if( isOneDayApart(date1, date2) ){
                gameStats.consecutiveDays++;
                date1 = date2;
            }else{
                gameStats.consecutiveDays = 0;
                break;
            }
        }
    }

    saveStats(gameStats);
}

function isOneDayApart(date1, date2) {
    // Convert both dates to milliseconds
    let date1_ms = new Date(date1).setHours(0, 0, 0, 0);
    let date2_ms = new Date(date2).setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds
    let difference_ms = Math.abs(date1_ms - date2_ms);

    // Convert back to days
    let difference_days = difference_ms / 1000 / 60 / 60 / 24;

    // Check if difference is exactly 1 day
    return difference_days === 1;
}

export const updateStreak = () => {
    let gameStats = getStats();
    gameStats.currentStreak = 0;
    if( gameStats.gamesData.length){
        const gamesData = gameStats.gamesData.slice();
        gamesData.reverse();
        for (let data of gamesData) {
            if( data.status === 'WIN'){
                gameStats.currentStreak++;
            }else {
                break;
            }
        }
    }
    saveStats(gameStats);
}

export const getStats = () => {
    let gameStats =  JSON.parse(localStorage.getItem('gameStats'));

    if( gameStats ){
        return gameStats;
    }
    gameStats = {
        gamesData: [],
        playedGames: 0,
        countWins: 0,
        percentWins: 0,
        consecutiveDays: 0,
        currentStreak: 0,
        fastSolves: 0,
        playedHolidayPuzzle: {
            holiday: false,
            february: false,
        },
        nightPuzzles: 0,
        morningPuzzles: 0,
    }
    saveStats(gameStats);
    return gameStats;
}