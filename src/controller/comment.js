/*
 * @Author      : Chinge Yang
 * @Date        : 2022-09-08 16:44:27
 * @LastEditTime: 2022-09-09 10:25:13
 * @LastEditors : Chinge Yang
 * @Description : 留言 controller
 * @FilePath    : /my-message-board/src/controller/comment.js
 */

const Comment = require("../model/Comment");

// 获取留言列表
async function getCommentList(filterType, username) {
    // 查询条件
    const whereOpt = {};
    if (username) {
        whereOpt.username = username;
    }

    // 查询
    const list = await Comment.find(whereOpt).sort({ _id: -1 });
    return list;
}

// 创建留言
async function createComment(content, username) {
    // 插入数据库
    const newComment = await Comment.create({ content, username });
    // 返回留言信息
    return newComment;
}

// 删除留言
async function delComment(_id, username) {
    await Comment.remove({ _id, username });
}

// 更新留言
async function updateComment(_id, username, content) {
    // 只能更新自己的留言
    const newData = await Comment.findOneAndUpdate({ _id, username }, { content }, { new: true });
    console.log(newData);
    return newData;
}

module.exports = { getCommentList, createComment, delComment, updateComment };
