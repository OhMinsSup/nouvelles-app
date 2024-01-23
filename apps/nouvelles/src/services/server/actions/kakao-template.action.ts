'use server';
import * as z from 'zod';
import { RESULT_CODE } from '~/constants/constants';
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
  // eslint-disable-next-line no-undef
  data: Kakao.Share.DefaultListSettings | null;
  errors: any;
}

const schema = z.object({
  id: z.number(),
  revalidatePath: z.string().optional(),
});

export const sharekakaoTemplateAction = async (bindInput: BindInput) => {
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

  const { list } = await itemService.getShareItems(validatedFields.data.id);
  const template = kakaoService.getTemplateArgs(
    list,
    // eslint-disable-next-line no-undef
  ) as Kakao.Share.DefaultListSettings;

  return {
    ok: true,
    resultCode: RESULT_CODE.OK,
    resultMessage: 'Success',
    data: template,
    errors: null,
  } as Result;
};
