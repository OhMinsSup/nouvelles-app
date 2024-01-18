'server-only';
import { BaseError, ErrorType } from '@nouvelles/error';
import { headers } from 'next/headers';
import { API_ENDPOINTS, PAGE_ENDPOINTS } from '~/constants/constants';
import { getHeaderInDomainInfo } from '@nouvelles/libs';
import type { ItemSchema } from '~/services/api/items/items.model';

export class KakaoService {
  private _makeContent = (items: ItemSchema) => {
    return {
      title: items.title,
      description: items.description,
      image_url: items.image,
      image_width: 640,
      image_height: 640,
      link: {
        web_url: items.realLink,
        mobile_web_url: items.realLink,
      },
    };
  };

  private _makeLayout = (url: URL) => {
    const stringURL = url.toString();
    return {
      header_link: {
        web_url: stringURL,
        mobile_web_url: stringURL,
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            web_url: stringURL,
            mobile_web_url: stringURL,
          },
        },
      ],
    };
  };

  private _makeTemplateArgs = (items: ItemSchema[], baseURL: string) => {
    const url = new URL(PAGE_ENDPOINTS.NEWS.TODAY, baseURL);
    const layout = this._makeLayout(url);
    return {
      object_type: 'list',
      header_title: '뉴스럴 트렌드',
      header_link: layout.header_link,
      contents: items.map((item) => this._makeContent(item)),
      buttons: layout.buttons,
    };
  };

  sendMsg = async (accessToken: string, items: ItemSchema[]) => {
    const info = getHeaderInDomainInfo(headers());
    const res = await fetch(API_ENDPOINTS.kakao_default_message, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
      body: new URLSearchParams({
        template_object: JSON.stringify(
          this._makeTemplateArgs(items, info.domainUrl),
        ),
      }),
    });

    if (!res.ok) {
      throw new BaseError(ErrorType.HTTPError, 'Kakao API error', res);
    }

    const data = await res.json();

    return data;
  };
}

export const kakaoService = new KakaoService();
