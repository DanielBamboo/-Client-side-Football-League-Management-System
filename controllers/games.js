const Game = require('../tables').Game;
const Game_record = require('../tables').Game_record;
const Player = require('../tables').Player;

module.exports = {
    'GET /games': async(ctx, next) => {
        if(!ctx.session.view_user) {
            ctx.response.redirect('/signin');
        }
        if(!ctx.session.season) {
            ctx.response.redirect('/home');
        }
        console.log('games games');
        console.log(ctx.session.season);
        ctx.render('games.html', {
            season_name: ctx.session.season
        });
    },

    'GET /fetch/games': async (ctx, next) => {
        var games = await Game.findAll({
            where: {
                season: ctx.session.season
            }
        })

        ctx.response.type = 'application/json';
        ctx.response.body = {
            games: games
        }
    },

    'GET /game/:game_url': async (ctx, next) => {
        var infos = (ctx.params.game_url).split('_');
        infos = infos.map(element => element.replace('-', ' '));
        console.log(infos);

        // ctx.body = infos;

        ctx.render('game-details.html', {
            game_id: infos[0],
            home_team: infos[1],
            away_team: infos[2]
        });
    },

    'GET /fetch/game-records/:game_id': async (ctx, next) => {
        var game_id = ctx.params.game_id;
        // console.log();
        // console.log(game_id);
        // console.log();
        var game_records = await Game_record.findAll({
            include: [
                {
                    model: Player,
                    required: true
                }
            ],
            where: {
                game_id: game_id
            }
        });
        
        // console.log(JSON.stringify(records));
        // console.log(records);

        var res_records = game_records.map(function(record) {
            return {
                id: record.id,
                game_id: record.game_id,
                event: record.event,
                player_id: record.player_id,
                player_name: record.player.player_name,
                club: record.player.club,
                minutes: record.minutes,
            }
        });

        console.log(res_records);

        ctx.response.type = 'application/json';
        ctx.response.body = {
            records: res_records
        };
    }
}