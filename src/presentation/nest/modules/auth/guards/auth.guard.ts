import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';

import { AUTH_CONSTANTS } from '../../constants';
import { CommonError, IAuthService } from '../../../../../core/application';
import { ExtendRequest } from '../../../extends/extend.request';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_CONSTANTS.AUTH_SERVICE)
    private readonly authService: IAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExtendRequest>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      CommonError.Unauthorized('token not found');
    }

    try {
      const payload =  this.authService.validateAccess(token);
      request.account = {
        id: payload.sub,
        login: payload.login
      };
      return true;
    } catch (e) {
      CommonError.Unauthorized('token not valid');
    }
  }

  private extractTokenFromHeader(request: ExtendRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
