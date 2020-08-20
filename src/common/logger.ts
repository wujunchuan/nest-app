/*
 * Winston logger config options
 * @Author: John Trump
 * @Date: 2020-08-21 00:35:13
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-21 01:40:44
 * @FilePath: /src/common/logger.ts
 */
import * as winston from 'winston';
import { utilities } from 'nest-winston';
import { LoggerOptions } from 'winston';

const loggerOptions: LoggerOptions = {
  level: 'info',
  // format: winston.format.json(),
  format: winston.format.combine(
    winston.format.timestamp(),
    utilities.format.nestLike(),
  ),
  defaultMeta: { service: 'nest-service' },
  transports: [
    new winston.transports.Console(),
    // - Write all logs with level `error` and below to `error.log`
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // - Write all logs with level `info` and below to `combined.log`
    new winston.transports.File({ filename: 'combined.log' }),
  ],
};

export default loggerOptions;
