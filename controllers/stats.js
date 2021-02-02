const tables = require('../tables');
const Player = tables.Player;
const Player_record = tables.Player_record;

module.exports = {
    'GET /stats': async (ctx, next) => {
        if(!ctx.session.view_user) {
            ctx.response.redirect('/signin');
        }
        if(!ctx.session.season) {
            ctx.response.redirect('/home');
        }

        ctx.render('stats.html', {});
    },

    'GET /fetch/player-stats': async (ctx, next) => {
        var player_stats = await Player.findAll({
            include: [
                {
                    model: Player_record,
                    required: true,
                    where: {
                        season: ctx.session.season
                    }
                }
            ],
        })
        ctx.response.type = 'application/json';
        ctx.response.body = {
            player_stats: player_stats
        }
    }
}