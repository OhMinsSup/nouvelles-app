"server-only";
import { env } from "../../../env.mjs";
import { getDateFormatted } from "~/utils/utils";
import type { ItemSchema } from "~/server/items/items.model";
import dayjs from "dayjs";

export default function createTemplateMessage(items: ItemSchema[]) {
  const currentDate = dayjs().format("YYYY년 MM월 DD일");
  const template_object = {
    object_type: "list",
    header_title: `${currentDate} 마케팅 뉴스클리핑`,
    header_link: {
      web_url: env.NEXT_PUBLIC_SITE_URL,
      mobile_web_url: env.NEXT_PUBLIC_SITE_URL,
    },
    contents: items.map((item) => {
      const link = item.realLink || item.link || env.NEXT_PUBLIC_SITE_URL;
      return {
        title: item.title,
        description: item.pulbishedAt
          ? `${getDateFormatted(item.pulbishedAt)} | ${item.reporter}`
          : `${item.reporter}`,
        image_url: item.image,
        image_width: 640,
        image_height: 640,
        link: {
          web_url: link,
          mobile_web_url: link,
        },
      };
    }),
    buttons: [
      {
        title: "웹으로 이동",
        link: {
          web_url: env.NEXT_PUBLIC_SITE_URL,
          mobile_web_url: env.NEXT_PUBLIC_SITE_URL,
        },
      },
    ],
  };

  return {
    template_object,
  };
}
