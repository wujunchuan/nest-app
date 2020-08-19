/*
 * 配置文件
 * @Author: John Trump
 * @Date: 2020-08-20 00:40:56
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-20 00:42:26
 * @FilePath: /src/config/index.ts
 */
import mysqlConfig from './mysql';
import jwtConfig from './jwt';
// import uploadConfig from './upload'
const appConfig = [
  mysqlConfig,
  jwtConfig,
  // uploadConfig
];

export default appConfig;
