const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const session = require("koa-generic-session");
const cors = require("koa2-cors");

const index = require("./routes/index");
const users = require("./routes/users");
const comments = require("./routes/comments");

// error handler
onerror(app);

// 服务端支持跨域
app.use(cors({
    origin: 'http://localhost:8080',  // 允许跨域的域名
    credentials: true,  // 允许跨域携带cookie
}));

// middlewares
app.use(
    bodyparser({
        enableTypes: ["json", "form", "text"]
    })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
    views(__dirname + "/views", {
        extension: "pug"
    })
);

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// session 配置
app.keys = ["session-koa2"];
app.use(
    session({
        cookie: {
            path: "/", // cookie 在根目录下生效
            httpOnly: true, // cookie 只允许后端修改
            maxAge: 24 * 60 * 60 * 1000 // cookie 有效时长
        }
    })
);

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(comments.routes(), comments.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});

module.exports = app;
