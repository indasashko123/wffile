import { CommonError, ErrorType } from "./common.error";

export class HttpError extends CommonError {

  status: number;
  constructor(err: CommonError) {
    super(err.type, err.message, err.errors);
    switch(err.type) {
      case ErrorType.badRequest : {
        this.status = 400;
        break;
      }
      case ErrorType.internal: {
        this.status = 500;
        break;
      }
      case ErrorType.noAccess: {
        this.status = 403;
        break;
      }
      case ErrorType.notFound: {
        this.status = 404;
        break;
      }
      case ErrorType.rateLimit: {
        this.status = 429;
        break;
      }
      case ErrorType.unknown: {
        this.status = 500;
        break;
      }
      case ErrorType.unauthorized: {
        this.status = 401;
        break;
      }
    }
  }
}
