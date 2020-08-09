/*
 * @Author: John Trump
 * @Date: 2020-07-27 11:50:09
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-09 15:57:00
 * @FilePath: /config/db.js
 */
const productConfig = {
  mysql: {
    port: '3306',
    host: '127.0.0.1',
    user: 'root',
    password: 'meetone123',
    database: 'nest_zero_to_one', // 库名
    connectionLimit: 10, // 连接限制
  },
};

const localConfig = {
  mysql: {
    port: '3306',
    host: '127.0.0.1',
    user: 'root',
    password: 'meetone123',
    database: 'nest_zero_to_one', // 库名
    connectionLimit: 10, // 连接限制
  },
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const config = process.env.NODE_ENV ? productConfig : localConfig;

export default config;
