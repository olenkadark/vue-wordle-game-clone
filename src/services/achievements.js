function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('@/assets/images/achievements', false, /\.(png|jpe?g|svg)$/));
export const achievements = [
    {
        id: "first_word",
        image: images[0],
        validate(stats) {
            return stats.countWins >= 1;
        }
    },
    {
        id: "rookie_riddler",
        image: images[1],
        validate(stats) {
            return stats.countWins >= 10;
        }
    },
    {
        id: "puzzle_pro",
        image: "",
        validate(stats) {
            return stats.countWins >= 50;
        }
    },
    {
        id: "centurion_solver",
        image: "",
        validate(stats) {
            return stats.countWins >= 100;
        }
    },
    {
        id: "epic_enigmatist",
        image: "",
        validate(stats) {
            return stats.countWins >= 100;
        }
    },
    {
        id: "puzzle_master",
        image: "",
        validate(stats) {
            return stats.countWins >= 100;
        }
    },
    {
        id: "word_wizard",
        image: "",
        validate(stats) {
            return stats.countWins >= 1000;
        }
    },
    {
        id: "master_of_words",
        image: "",
        validate(stats) {
            return stats.countWins >= 1500;
        }
    },
    {
        id: "newcomer",
        image: "",
        validate(stats) {
            return stats.playedGames >= 10;
        }
    },
    {
        id: "engaged_player",
        image: "",
        validate(stats) {
            return stats.playedGames >= 50;
        }
    },
    {
        id: "dedicated_gamer",
        image: "",
        validate(stats) {
            return stats.playedGames >= 100;
        }
    },
    {
        id: "veteran_challenger",
        image: "",
        validate(stats) {
            return stats.playedGames >= 250;
        }
    },
    {
        id: "puzzle_enthusiast",
        image: "",
        validate(stats) {
            return stats.playedGames >= 500;
        }
    },
    {
        id: "wordle_conqueror",
        image: "",
        validate(stats) {
            return stats.playedGames >= 1000;
        }
    },
    {
        id: "wordle_legend",
        image: "",
        validate(stats) {
            return stats.playedGames >= 2000;
        }
    },
    {
        id: "strategist",
        image: "",
        validate(stats) {
            const minAttempts =  Object.keys(stats.gamesData).filter(key => {
                return stats.gamesData[key]['guesses'].filter(g => g[0] !== '').length <= 3;
            }).length;
            return minAttempts >= 10;
        }
    },
    {
        id: "perfectionist",
        image: "",
        validate(stats) {
            return stats.percentWins >= 75;
        }
    },
    {
        id: "weeklong_warrior",
        image: "",
        validate(stats) {
            return stats.consecutiveDays >= 7;
        }
    },
    {
        id: "month_master",
        image: "",
        validate(stats) {
            return stats.consecutiveDays >= 30;
        }
    },
    {
        id: "word_streak",
        image: "",
        validate(stats) {
            return stats.currentStreak >= 5;
        }
    },
    {
        id: "flawless_streak",
        image: "",
        validate(stats) {
            return stats.currentStreak >= 10;
        }
    },
    {
        id: "speed_demon",
        image: "",
        validate(stats) {
            return stats.fastSolves >= 3;
        }
    },
    {
        id: "night_owl",
        image: "",
        validate(stats) {
            return stats.nightPuzzles >= 10;
        }
    },
    {
        id: "night_shift",
        image: "",
        validate(stats) {
            return stats.nightPuzzles >= 25;
        }
    },
    {
        id: "early_bird_solver",
        image: "",
        validate(stats) {
            return stats.morningPuzzles >= 10;
        }
    },
    {
        id: "ghostly_guesser",
        image: "",
        validate(stats) {
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);// Zero out time for today

            let currentYear = currentDate.getFullYear();
            let october31 = new Date(Date.UTC(currentYear, 9, 31));
            october31.setHours(0, 0, 0, 0); // Zero out time for october31

            if (currentDate.getTime() < october31.getTime()) return false;

            return stats.gamesData.filter(data => {
                let dateFromString = new Date(data.dateTime);
                dateFromString.setHours(0, 0, 0, 0); // Zero out time for date from string
                return dateFromString.getTime() === october31.getTime()
            }).length > 0;
        }
    },
    {
        id: "holiday_spirit",
        image: "",
        validate(stats) {
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);// Zero out time for today

            let currentYear = currentDate.getFullYear();
            let december31 = new Date(Date.UTC(currentYear, 11, 25));
            december31.setHours(0, 0, 0, 0); // Zero out time for december31

            if (currentDate.getTime() < december31.getTime()) return false;

            return stats.gamesData.filter(data => {
                let dateFromString = new Date(data.dateTime);
                dateFromString.setHours(0, 0, 0, 0); // Zero out time for date from string
                return dateFromString.getTime() === december31.getTime()
            }).length > 0;
        }
    },
    /*{
        id: "new_years_pro",
        title: "New Year's Pro",
        description: "Solve the New Year’s puzzle exactly at midnight.",
        image: "",
        validate(stats) {
            return stats.playedHolidayPuzzle.NewYear;
        }
    },
    {
        id: "valentines_day_love",
        title: "Valentine's Day Love",
        description: "Use romantic words",
        image: "",
        validate(stats) {
            return stats.playedHolidayPuzzle.ValentineDay;
        }
    },
    {
        id: "cupids_arrow",
        title: "Cupid's Arrow",
        description: "Complete the Valentine's Day puzzle on February 14th.",
        image: "",
        validate(stats) {
            return stats.playedHolidayPuzzle.CupidsArrow;
        }
    },
    {
        id: "leap_year",
        title: "Leap Year",
        description: "Play a game on February 29th.",
        image: "",
        validate(stats) {
            return stats.playedHolidayPuzzle.february;
        }
    },
    {
        id: "easter_egg_hunt",
        title: "Easter Egg Hunt",
        description: "Incorporate Easter-related words.",
        image: "",
        validate(stats) {
            return stats.playedHolidayPuzzle.EasterEggHunt;
        }
    },
    {
        id: "easter_egg_hunt",
        title: "Easter Egg Hunt",
        description: "Incorporate Easter-related words.",
        image: "",
        validate(stats) {
            return stats.playedHolidayPuzzle.EasterEggHunt;
        }
    },
    {
        id: "easter_eggspert",
        title: "Easter Eggspert",
        description: "Solve the Easter puzzle during Easter weekend.",
        image: "",
        validate(stats) {
            return stats.playedHolidayPuzzle.EasterEggspert;
        }
    },
    {
        id: "thanksgiving_feast",
        title: "Thanksgiving Feast",
        description: 'Use words like "turkey," "grateful," and "harvest.',
        image: "",
        validate(stats) {
            return stats.playedHolidayPuzzle.ThanksgivingFeast;
        }
    },
    {
        id: "thankful_solver",
        title: "Thankful Solver",
        description: "Complete the Thanksgiving puzzle on Thanksgiving Day.",
        image: "",
        validate(stats) {
            return stats.playedHolidayPuzzle.ThankfulSolver;
        }
    },
    {
        id: "collector",
        title: "Collector",
        description: "Unlock all achievements available in the game.",
        imageDescription: "A treasure chest overflowing with gems and gold, set on a sandy beach backdrop.",
        validate(stats, allAchievements) {
            return allAchievements.every(ach => ach.id === "collector" ? true : ach.validate(stats));
        }
    }*/
];
