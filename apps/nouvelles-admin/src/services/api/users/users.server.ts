'server-only';
import { db } from '@nouvelles/database';
import { BaseError, ErrorType } from '@nouvelles/error';
import type { Session } from '~/services/server/auth';

export class UserService {
  async byAccessToken(session: Session) {
    const account = await db.account.findFirst({
      select: {
        id: true,
        access_token: true,
        refresh_token: true,
      },
      where: {
        userId: session.user.id,
        provider: 'kakao',
      },
    });

    if (!account) {
      throw new BaseError(ErrorType.DateError, 'Account not found');
    }

    return account.access_token;
  }
}

export const userService = new UserService();
