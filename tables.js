const Sequelize = require('sequelize');
const config = require('./config');

console.log('tables.js');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var Coach = sequelize.define('coach', {
    coach_name: {
        type: Sequelize.STRING(20),
        primaryKey: true
    },
    country: Sequelize.STRING(20)
}, {
    timestamps: false
});

var User = sequelize.define('user', {
    usrname: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    pwd: Sequelize.STRING(50)
}, {
    timestamps: false
});

var Player = sequelize.define('player', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'id',
        autoIncrement: true
    },
    player_name: Sequelize.STRING(20),
    shirt_number: {
        type:Sequelize.INTEGER,
        validate: {
        }
    },
    age: Sequelize.INTEGER,
    preferred_foot: Sequelize.STRING(6),
    position: Sequelize.STRING(20),
    club: {
        type: Sequelize.STRING(20),
        validate: {
        }
    },
    country: Sequelize.STRING(20)
}, {
    timestamps: false
});

var Club = sequelize.define('club', {
    club_name: {
        type: Sequelize.STRING(20),
        primaryKey: true
    },
    league: Sequelize.STRING(30),
    chief_coach: Sequelize.STRING(20)
}, {
    timestamps: false
});

var League = sequelize.define('league', {
    league_name: {
        type: Sequelize.STRING(20),
        primaryKey: true
    },
    current_season: Sequelize.STRING(20)
}, {
    timestamps: false
});

var Game = sequelize.define('game', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    season: Sequelize.STRING(30),
    league: Sequelize.STRING(30),
    turn: Sequelize.INTEGER,
    matchday: Sequelize.DATE,
    home_team: Sequelize.STRING(20),
    away_team: Sequelize.STRING(20),
    home_team_goal: Sequelize.INTEGER,
    away_team_goal: Sequelize.INTEGER,
    game_result: Sequelize.INTEGER
}, {
    timestamps: false
});

var Season = sequelize.define('season', {
    season_name: {
        type: Sequelize.STRING(30),
        primaryKey: true
    },
    beginAt: Sequelize.DATE,
    endAt: Sequelize.DATE,
    start: Sequelize.BOOLEAN
}, {
    timestamps: false
});

var Game_record = sequelize.define('game_record', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'id',
        autoIncrement: true
    },
    game_id: Sequelize.INTEGER,
    event: Sequelize.INTEGER,
    player_id: {
        type: Sequelize.INTEGER,
        field: 'player_id'
    },
    minutes: Sequelize.INTEGER
}, {
    timestamps: false
});

var Player_record = sequelize.define('player_record', {
    player_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },

    season: {
        type: Sequelize.STRING(30),
        primaryKey: true
    },
    goal: Sequelize.INTEGER,
    assist: Sequelize.INTEGER
}, {
    timestamps: false
});

var Club_record = sequelize.define('Club_record', {
    club_name: {
        type: Sequelize.STRING(20),
        primaryKey: true
    },
    season: {
        type: Sequelize.STRING(30),
        primaryKey: true
    },
    league: Sequelize.STRING(30),
    points: Sequelize.INTEGER,
    wins: Sequelize.INTEGER,
    draws: Sequelize.INTEGER,
    loses: Sequelize.INTEGER,
    goals: Sequelize.INTEGER,
    lose_goals: Sequelize.INTEGER,
    turns: Sequelize.INTEGER
}, {
    timestamps: false
});

// Game_record.associate = function(models) {
//     Game_record.hasOne(models.Player, {
//         foreignKey: 'id',
//         sourceKey: 'Player_id'
//     });
// }

// Player.associate = function(models) {
//     Game_record.belongsTo(models.Player, {
//         foreignKey: 'id'
//     });
// }

Game_record.belongsTo(Player, {
    targetKey: 'id',
    foreignKey: 'player_id'
});

Player.hasMany(Game_record, {
    sourceKey: 'id',
    foreignKey: 'player_id'
});

Player_record.belongsTo(Player, {
    targetKey: 'id',
    foreignKey: 'player_id'
});

Player.hasMany(Player_record, {
    sourceKey: 'id',
    foreignKey: 'player_id'
});

Game_record.belongsTo(Game, {
    targetKey: 'id',
    foreignKey: 'game_id'
});

Game.hasMany(Game_record, {
    sourceKey: 'id',
    foreignKey: 'game_id'
});

Club.belongsTo(Coach, {
    sourceKey: 'coach_name',
    foreignKey: 'chief_coach'
})
Coach.hasOne(Club, {
    targetKey: 'coach_name',
    foreignKey: 'chief_coach'
})



module.exports = {
    Coach: Coach,
    User: User,
    Player: Player,
    Club: Club,
    League: League,
    Game: Game,
    Season: Season,
    Game_record: Game_record,
    Player_record: Player_record,
    Club_record: Club_record,
    Op: Sequelize.Op
}