"server-only";
import { db } from "apps/nouvelles/src/server/db/prisma";

export class AccountsService {
  async getAccount(userId: string, provider: string = "kakao") {
    // 제일 마지막에 생성된 카카오 계정을 가져온다.
    const account = await db.account.findFirst({
      where: { userId: userId, provider },
    });

    if (!account) {
      return null;
    }

    return account;
  }
}

export const accountsService = new AccountsService();
