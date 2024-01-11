'use server';
import * as z from 'zod';
import { RESULT_CODE } from '~/constants/constants';
import { getSession } from '~/services/server/auth';

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
    console.log('sendkakaoMsgAction', bindInput);
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

    const data = await Promise.resolve(bindInput);

    console.log('sendkakaoMsgAction', data);
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
