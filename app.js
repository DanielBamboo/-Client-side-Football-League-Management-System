const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const controller = require('./controllers');
const session = require('koa-session');
const templating = require('./templating');
const isProduction = process.env.NODE_ENV === 'production';

app.keys = ['this is my secret'];


app.use(session({
    key: 'koa:sess',
    maxAge: 7200000,
    overwrite: true,
    httpOnly: true,
    signed: true,
}, app));

// log request URL:
// 记录下请求的 URL 
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var start = new Date().getTime();
    await next();
    var execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});


//static file support:
if(!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller middleware
app.use(controller());


let server = app.listen(3999);
console.log('app started at port 3999');