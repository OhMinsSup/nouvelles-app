'use server';
import * as z from 'zod';
import { RESULT_CODE } from '~/constants/constants';
import { getSession } from '~/services/server/auth';
import { userService } from '~/services/api/users/users.server';
import { kakaoService } from '~/services/api/kakao/kakao.server';
import { itemService } from '~/services/api/items/items.server';

interface BindInput {
  id: number;
  revalidatePath?: string;
}

export interface Result {
  ok: boolean;
  resultCode: number;
  resultMessage: string;
  data: BindInput | null;
  errors: any;
}

const schema = z.object({
  id: z.number(),
  revalidatePath: z.string().optional(),
});

export const sendkakaoMsgAction = async (bindInput: BindInput) => {
  try {
    const session = await getSession();
    if (!session) {
      return {
        ok: false,
        resultCode: RESULT_CODE.LOGIN_REQUIRED,
        resultMessage: 'Login required',
        data: null,
        errors: null,
      } as Result;
    }

    const validatedFields = schema.safeParse(bindInput);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
      return {
        ok: false,
        resultCode: RESULT_CODE.INVALID,
        resultMessage: 'Invalid form data',
        data: null,
        errors: validatedFields.error.flatten().fieldErrors,
      } as Result;
    }

    const accessToken = await userService.byAccessToken(session);
    if (!accessToken) {
      return {
        ok: false,
        resultCode: RESULT_CODE.NOT_EXIST,
        resultMessage: 'Access token not found',
        data: null,
        errors: null,
      } as Result;
    }

    const { list } = await itemService.byToDays(validatedFields.data.id);

    const data = await kakaoService.sendMsg(accessToken, list);

    return {
      ok: true,
      resultCode: RESULT_CODE.OK,
      resultMessage: 'Success',
      data,
      errors: null,
    } as Result;
  } catch (error) {
    throw error;
  }
};
