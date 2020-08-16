/*
 * 错误信息接口形状
 * This will be the structure of the JSON that will be returned back to the user.
 * @Author: John Trump
 * @Date: 2020-08-12 23:48:02
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-17 00:54:49
 * @FilePath: /src/common/error/IErrorMessage.ts
 */
import { HttpStatus } from '@nestjs/common';

export interface IErrorMessage {
  /** 指定HTTPCode, 默认为 200 */
  httpStatus?: HttpStatus;
  errorMessage: string;
}
