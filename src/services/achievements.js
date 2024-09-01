function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('@/assets/images/achievements', false, /\.(png|jpe?g|svg)$/));
export const achievements = [
    {
        id: "first_word",
        title: "First Word!",
        description: "Successfully solve your first puzzle.",
        image: images[0],
        validate(stats) {
            return stats.countWins >= 1;
        }
    },
    {
        id: "rookie_riddler",
        title: "Rookie Riddler",
        description: "Solve your first 10 puzzles.",
        image: images[1],
        validate(stats) {
            return stats.countWins >= 10;
        }
    },
    {
        id: "puzzle_pro",
        title: "Puzzle Pro",
        description: "Solve 50 puzzles.",
        image: "",
        validate(stats) {
            return stats.countWins >= 50;
        }
    },
    {
        id: "centurion_solver",
        title: "Centurion Solver",
        description: "Solve 100 puzzles.",
        image: "",
        validate(stats) {
            return stats.countWins >= 100;
        }
    },
    {
        id: "epic_enigmatist",
        title: "Epic Enigmatist",
        description: "Solve 250 puzzles.",
        image: "",
        validate(stats) {
            return stats.countWins >= 100;
        }
    },
    {
        id: "puzzle_master",
        title: "Puzzle Master",
        description: "Solve 500 puzzles.",
        image: "",
        validate(stats) {
            return stats.countWins >= 100;
        }
    },
    {
        id: "word_wizard",
        title: "Word Wizard",
        description: "Solve 1,000 puzzles.",
        image: "",
        validate(stats) {
            return stats.countWins >= 1000;
        }
    },
    {
        id: "master_of_words",
        title: "Master of Words",
        description: "Celebrate your mastery by winning 1,500 games.",
        image: "",
        validate(stats) {
            return stats.countWins >= 1500;
        }
    },
    {
        id: "newcomer",
        title: "Newcomer",
        description: "Play 10 games.",
        image: "",
        validate(stats) {
            return stats.playedGames >= 10;
        }
    },
    {
        id: "engaged_player",
        title: "Engaged Player",
        description: "Play 50 games.",
        image: "",
        validate(stats) {
            return stats.playedGames >= 50;
        }
    },
    {
        id: "dedicated_gamer",
        title: "Dedicated Gamer",
        description: "Play 100 games.",
        image: "",
        validate(stats) {
            return stats.playedGames >= 100;
        }
    },
    {
        id: "veteran_challenger",
        title: "Veteran Challenger",
        description: "Play 250 games.",
        image: "",
        validate(stats) {
            return stats.playedGames >= 250;
        }
    },
    {
        id: "puzzle_enthusiast",
        title: "Puzzle Enthusiast",
        description: "Play 500 games.",
        image: "",
        validate(stats) {
            return stats.playedGames >= 500;
        }
    },
    {
        id: "wordle_conqueror",
        title: "Wordle Conqueror",
        description: "Play 1,000 games.",
        image: "",
        validate(stats) {
            return stats.playedGames >= 1000;
        }
    },
    {
        id: "wordle_legend",
        title: "Wordle Legend",
        description: "Reach a monumental milestone by playing 2,000 games.",
        image: "",
        validate(stats) {
            return stats.playedGames >= 2000;
        }
    },
    {
        id: "strategist",
        title: "Strategist",
        description: "Win 10 games in less than 3 attempts.",
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
        title: "Perfectionist",
        description: "Achieve a 75% win rate.",
        image: "",
        validate(stats) {
            return stats.percentWins >= 75;
        }
    },
    {
        id: "weeklong_warrior",
        title: "Weeklong Warrior",
        description: "Complete a puzzle every day for a week.",
        image: "",
        validate(stats) {
            return stats.consecutiveDays >= 7;
        }
    },
    {
        id: "month_master",
        title: "Month Master",
        description: "Solve a puzzle every day for an entire month.",
        image: "",
        validate(stats) {
            return stats.consecutiveDays >= 30;
        }
    },
    {
        id: "word_streak",
        title: "Word Streak",
        description: "Guess 5 words correctly in a row without any errors.",
        image: "",
        validate(stats) {
            return stats.currentStreak >= 5;
        }
    },
    {
        id: "flawless_streak",
        title: "Flawless Streak",
        description: "Guess 10 words correctly in a row without any errors.",
        image: "",
        validate(stats) {
            return stats.currentStreak >= 10;
        }
    },
    {
        id: "speed_demon",
        title: "Speed Demon",
        description: "Solve three puzzles in under three minutes total.",
        image: "",
        validate(stats) {
            return stats.fastSolves >= 3;
        }
    },
    {
        id: "night_owl",
        title: "Night Owl",
        description: "Solve 10 puzzles between midnight and 5 a.m.",
        image: "",
        validate(stats) {
            return stats.nightPuzzles >= 10;
        }
    },
    {
        id: "night_shift",
        title: "Night Shift",
        description: "Complete 25 puzzles between midnight and 5 a.m.",
        image: "",
        validate(stats) {
            return stats.nightPuzzles >= 25;
        }
    },
    {
        id: "early_bird_solver",
        title: "Early Bird Solver",
        description: "Solve 10 puzzles between 5 a.m. and 8 a.m.",
        image: "",
        validate(stats) {
            return stats.morningPuzzles >= 10;
        }
    },
    /*{
        id: "halloween_haunt",
        title: "Halloween Haunt",
        description: "Solve spooky words related to Halloween",
        image: "",
        validate(stats) {
            return stats.playedHolidayPuzzle.HalloweenHaunt;
        }
    },
    {
        id: "ghostly_guesser",
        title: "Ghostly Guesser",
        description: "Solve the Halloween puzzle on October 31st.",
        image: "",
        validate(stats) {
            return stats.playedHolidayPuzzle.Halloween31;
        }
    },
    {
        id: "christmas_cheer",
        title: "Christmas Cheer",
        description: "Focus on festive terms such.",
        image: "",
        validate(stats) {
            return stats.playedHolidayPuzzle.ChristmasCheer;
        }
    },
    {
        id: "holiday_spirit",
        title: "Holiday Spirit",
        description: "Complete the Christmas puzzle on December 25th",
        image: "",
        validate(stats) {
            return stats.playedHolidayPuzzle.HolidaySpirit;
        }
    },
    {
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
