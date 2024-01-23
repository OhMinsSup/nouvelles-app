'server-only';
import { BaseError, ErrorType } from '@nouvelles/error';
import { headers } from 'next/headers';
import { getHeaderInDomainInfo } from '@nouvelles/libs';
import { API_ENDPOINTS, PAGE_ENDPOINTS } from '~/constants/constants';
import type { ItemSchema } from '~/services/api/items/items.model';

export class KakaoService {
  private _makeContent = (items: ItemSchema) => {
    return {
      title: items.title,
      description: items.description,
      imageUrl: items.image,
      link: {
        webUrl: items.realLink,
        mobileWebUrl: items.realLink,
      },
    };
  };

  private _makeLayout = (url: URL) => {
    const stringURL = url.toString();
    return {
      headerLink: {
        webUrl: stringURL,
        mobileWebUrl: stringURL,
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            webUrl: stringURL,
            mobileWebUrl: stringURL,
          },
        },
      ],
    };
  };

  private _makeTemplateArgs = (items: ItemSchema[], baseURL: string) => {
    const url = new URL(PAGE_ENDPOINTS.NEWS.TODAY, baseURL);
    const layout = this._makeLayout(url);
    return {
      objectType: 'list',
      headerTitle: '뉴스럴 트렌드',
      headerLink: layout.headerLink,
      contents: items.map((item) => this._makeContent(item)),
      buttons: layout.buttons,
    };
  };

  getTemplateArgs = (items: ItemSchema[]) => {
    const info = getHeaderInDomainInfo(headers());
    return this._makeTemplateArgs(items, info.domainUrl);
  };

  sendMsg = async (accessToken: string, items: ItemSchema[]) => {
    const templateObject = this.getTemplateArgs(items);
    const res = await fetch(API_ENDPOINTS.kakao_default_message, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
      body: new URLSearchParams({
        template_object: JSON.stringify(templateObject),
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
