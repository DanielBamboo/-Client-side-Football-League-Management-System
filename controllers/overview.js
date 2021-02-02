module.exports = {
    'GET /overview': async (ctx, next) => {
        if(!ctx.session.view_user) {
            ctx.response.redirect('/signin');
        }
        if(!ctx.session.season) {
            ctx.response.redirect('/home');
        }
        ctx.render('overview.html', {});
    }
}