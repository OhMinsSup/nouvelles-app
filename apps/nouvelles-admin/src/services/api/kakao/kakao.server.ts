'server-only';
import { BaseError, ErrorType } from '@nouvelles/error';
import { env } from 'env.mjs';
import { API_ENDPOINTS } from '~/constants/constants';
import type { ItemSchema } from '~/services/api/items/items.model';

export class KakaoService {
  private _makeContent(items: ItemSchema) {
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
  }

  private _makeButton() {
    return [
      {
        title: '웹으로 이동',
        link: {
          web_url: env.SITE_URL,
          mobile_web_url: env.SITE_URL,
        },
      },
    ];
  }

  private _makeHeaderLink() {
    return {
      web_url: env.SITE_URL,
      mobile_web_url: env.SITE_URL,
    };
  }

  private _makeTemplateArgs(items: ItemSchema[]) {
    return {
      object_type: 'list',
      header_title: '뉴스럴 트렌드',
      header_link: this._makeHeaderLink(),
      contents: items.map(this._makeContent),
      buttons: this._makeButton(),
    };
  }

  sendMsg = async (accessToken: string, items: ItemSchema[]) => {
    const res = await fetch(API_ENDPOINTS.kakao_default_message, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
      body: new URLSearchParams({
        template_object: JSON.stringify(this._makeTemplateArgs(items)),
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
