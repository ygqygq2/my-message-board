/*
 * @Author      : Chinge Yang
 * @Date        : 2022-09-06 11:03:05
 * @LastEditTime: 2022-09-09 10:26:58
 * @LastEditors : Chinge Yang
 * @Description : 评论相关的路由
 * @FilePath    : /my-message-board/src/routes/comments.js
 */
const router = require("koa-router")();
const loginCheck = require("../middleware/loginCheck");
const { getCommentList, createComment, delComment, updateComment } = require("../controller/comment");

router.prefix("/comment");

// 定义路由：获取留言板列表
router.get("/list", loginCheck, async (ctx, next) => {
    // 获取 filterType: 1 - 全部, 2 - 我的
    let { filterType } = ctx.query;
    filterType = parseInt(filterType) || 1;

    // 获取当前用户名
    let username = "";
    if (filterType === 2) {
        username = ctx.session.userInfo.username;
    }

    // 获取留言列表
    const list = await getCommentList(username);
    ctx.body = {
        errno: 0,
        data: list
    };
});

// 定义路由：创建留言
router.post("/create", loginCheck, async (ctx, next) => {
    const { content } = ctx.request.body;
    const { username } = ctx.session.userInfo;

    try {
        // 提交留言
        const newComment = await createComment(content, username);

        // 返回
        ctx.body = {
            errno: 0,
            data: newComment
        };
    } catch (ex) {
        console.error(ex);
        ctx.body = {
            errno: -1,
            message: "创建留言失败"
        };
    }
});

// 更新留言
router.post("/update", loginCheck, async (ctx, next) => {
    // 获取留言 id 和 内容
    const { _id, content } = ctx.request.body;
    // 获取当前用户名
    const { username } = ctx.session.userInfo;
    // 更新留言
    try {
        const newData = await updateComment(_id, username, content);
        ctx.body = {
            errno: 0,
            data: newData
        };
    } catch (ex) {
        console.error(ex);
        ctx.body = {
            errno: -1,
            message: "更新留言失败"
        };
    }
});

// 删除留言
router.post("/del", loginCheck, async (ctx, next) => {
    // 获取留言 id
    const { _id } = ctx.request.body;
    // 获取当前用户名
    const { username } = ctx.session.userInfo;
    // 删除留言
    try {
        await delComment(_id, username);
        ctx.body = {
            errno: 0
        };
    } catch (ex) {
        console.error(ex);
        ctx.body = {
            errno: -1,
            message: "删除留言失败"
        };
    }
});

module.exports = router;
