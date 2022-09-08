const router = require("koa-router")();
const {login, register} = require("../controller/user");
const loginCheck = require("../middleware/loginCheck");

router.prefix("/users");

// 获取用户信息
router.get("/getUserInfo", loginCheck, async (ctx, next) => {
    ctx.body = {
        errno: 0,
        data: ctx.session.userInfo
    };
});

// 登录
router.post("/login", async (ctx, next) => {
    // 获取请求参数
    const { username, password } = ctx.request.body;
    // 验证登录
    const res = await login(username, password);
    // 登录成功，设置 session
    if (res) {
        // 设置 session
        ctx.session.userInfo = { username };

        // 返回
        ctx.body = {
            errno: 0
        };
    } else {
        ctx.body = {
            errno: -1,
            message: "登录失败"
        };
    }
});

// 用户注册
router.post("/register", async (ctx, next) => {
    // 获取请求中的用户信息
    const userInfo = ctx.request.body;
    // 调用注册方法
    try {
        const newUser = await register(userInfo);
        // 注册成功
        ctx.body = {
            errno: 0,
            data: newUser
        };
    } catch (ex) {
        // 注册失败
        console.error("注册失败", ex);
        ctx.body = {
            errno: -1,
            message: "注册失败"
        };
    }
});

module.exports = router;
