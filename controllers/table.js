const Club_record = require('../tables').Club_record;

module.exports = {
    'GET /table': async (ctx, next) => {
        if(!ctx.session.view_user) {
            ctx.response.redirect('/signin');
        }

        if(!ctx.session.season) {
            ctx.response.redirect('/home');
        }
        ctx.render('table.html', {});
    },

    'GET /fetch/current-season-table': async(ctx, next) => {
        var club_records_this_season = await Club_record.findAll({
            where: {
                season: ctx.session.season
            },
            order: [
                ['points', 'DESC']
            ]
        });

        console.log('/fetch/current-season-table');
        ctx.response.type = 'application/json';
        ctx.response.body = {
            club_records: club_records_this_season
        }

    }
}