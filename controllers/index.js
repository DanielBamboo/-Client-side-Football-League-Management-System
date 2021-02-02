module.exports = {
    'GET /': async (ctx, next) => {
        console.log('index.js');

        if(!ctx.session.view_user) {
            ctx.response.redirect('/signin');
        }

        ctx.render('home.html', {});
    },
    'GET /fetch/nav-name': async (ctx, next) => {
        var res = '';

        if(!ctx.session.season) {
            res = 'England Leagues'
        } else {
            res = ctx.session.season;
        }

        ctx.response.type = 'application.json';
        ctx.response.body = {
            nav_name: res
        }

    }
}