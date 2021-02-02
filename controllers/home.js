const Season = require('../tables').Season;

module.exports = {
    'GET /home': async(ctx, next) => {
        if(!ctx.session.view_user) {
            ctx.response.redirect('/signin');
        }
        ctx.render('home.html', {});
    },

    'GET /fetch/seasons': async (ctx, next) => {
        var seasons = await Season.findAll({
            fields: ['season_name']
        });
        console.log(seasons);
        ctx.response.type = 'application/json';
        ctx.response.body = {
            seasons: seasons
        }
    },

    // 设置一个cookie，这样下次访问的时候就知道访问的是哪个赛季了
    'GET /season/:season_name': async (ctx, next) => {
        console.log('get /season/:season_name');
        var season_name = decodeURIComponent(ctx.params.season_name);
        console.log('/season/:season_name -- >season name :' + season_name);
        ctx.session.season = season_name;
        ctx.redirect('../overview');
        // ctx.render('overview.html', {
        //     season_name: season_name
        // });
    },

    'GET /fetch/user-choosed-season': async( ctx, next ) => {
        ctx.response.type = 'application/json';
        ctx.response.body = {
            season: ctx.session.season
        }
    }

}