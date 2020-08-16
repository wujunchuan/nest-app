import { AppErrorTypeEnum as type } from './AppErrorTypeEnum';

export default {
  [type.USER_NOT_FOUND]: {
    errorMessage: 'User not found',
  },
  [type.USER_EXISTS]: {
    errorMessage: 'User exisists',
  },
  [type.NOT_IN_SESSION]: {
    errorMessage: 'No Session',
  },
  [type.NO_USERS_IN_DB]: {
    errorMessage: 'No Users exits in the database',
  },
};
