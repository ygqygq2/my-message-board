/*
 * @Author      : Chinge Yang
 * @Date        : 2022-09-08 16:44:27
 * @LastEditTime: 2022-09-08 17:03:43
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

module.exports = { getCommentList, createComment };
