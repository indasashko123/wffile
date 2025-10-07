import { DateParser } from "./dateParser";
import { ErrorAny } from "./error.any.type";

export enum ErrorType {
  unauthorized = 'UNAUTHORIZED_ERROR',
  badRequest = 'BAD_REQUEST_ERROR',
  internal = 'INTERNAL_ERROR',
  noAccess = 'NO_ACCESS_ERROR',
  notFound = 'NOT_FOUND',
  rateLimit = 'RATE_LIMIT',
  unknown = 'UNKNOWN_ERROR',
  lostConnection = 'LOST_CONNECTION',
}

export class CommonError extends Error {
  public errors: ErrorAny[];
  public type: ErrorType;
  constructor(type: ErrorType, message?: string, errors?: ErrorAny[] | ErrorAny) {
    if (!type) {
      type = ErrorType.unknown;
    }
    super(message + `\n${DateParser.getCurrentDateTime()}`);
    if (errors) {
      this.errors = Array.isArray(errors) ? errors : [errors];
    } else {
      this.errors = [];
    }
    this.type = type;
  }

  static Unauthorized(message?: string): never {
    let mess: string = ' ';
    if (!message) {
      mess = 'Unathorized error';
    } else {
      mess = message;
    }
    throw new CommonError(ErrorType.unauthorized, mess);
  }

  static BadRequest(message?: string, errors?: ErrorAny[]): never {
    throw new CommonError(ErrorType.badRequest, message, errors);
  }

  static InternalError(message?: string, errors?: ErrorAny[]): never {
    throw new CommonError(
      ErrorType.internal,
      'Internal Server Error\n ' + message,
      errors,
    );
  }

  static Forbidden(errors?: ErrorAny[]): never {
    throw new CommonError(ErrorType.noAccess, 'No access', errors);
  }

  static NotFound(message?: string, errors?: ErrorAny[]): never {
    let mess: string = ' ';
    if (!message) {
      mess = 'Not found';
    } else {
      mess = message;
    }
    throw new CommonError(ErrorType.notFound, mess, errors);
  }

  static RateLimitExecced(message?: string, errors?: ErrorAny[]): never {
    let mess: string = ' ';
    if (!message) {
      mess = 'Too many requests';
    } else {
      mess = message;
    }
    throw new CommonError(ErrorType.rateLimit, mess, errors);
  }

  static ConnectionLost(message?: string, errors?: ErrorAny[]): never {
    let mess: string = ' ';
    if (!message) {
      mess = `Connection lost`;
    } else {
      mess = message;
    }
    throw new CommonError(ErrorType.rateLimit, mess, errors);
  }
}

