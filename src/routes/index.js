const router = require("koa-router")();

router.get("/", async (ctx, next) => {
    await ctx.render("index", {
        title: "Hello Koa 2!"
    });
});

router.get("/string", async (ctx, next) => {
    ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
    ctx.body = { title: "koa2 json" };
});

// 测试 session，记录访问次数
router.get("/session-test", async (ctx, netx) => {
    if (ctx.session.viewcount == null) {
        // 用户尚未访问
        ctx.session.viewcount = 0;
    }
    // 用户访问加 1
    ctx.session.viewcount++;

    ctx.body = {
        title: "session-test",
        viewcount: ctx.session.viewcount
    }
});

module.exports = router;
