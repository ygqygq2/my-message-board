const config = require("../../config/index.ts");
const mongoose = require("mongoose");

// mongodb url
const url = `mongodb://${config.db.db_user}:${config.db.db_password}@${config.db.db_host}:${config.db.db_port}`;
// mongodb database name
const dbName = "my-message-board";

// connect to mongodb
mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

// 获取连接对象
const conn = mongoose.connection;

conn.on("error", (err) => {
    console.log("连接 mongodb 数据库失败", err);
});

module.exports = mongoose;
