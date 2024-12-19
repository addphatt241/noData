/* eslint-disable @typescript-eslint/no-explicit-any */
export default class ApiError extends Error {
  statusCode: any;
  isOperational: boolean;
  constructor(statusCode: any, message: any, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
