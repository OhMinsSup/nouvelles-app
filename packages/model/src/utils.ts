import {
  DESCRIPTION_REGEX,
  HANGUL_BREAK_REGEX,
  OG_DESCRIPTION_REGEX,
  OG_IMAGE_REGEX,
} from './constants';

export const replaceDescription = (html: string, isOgDescription?: boolean) => {
  return html.replace(
    isOgDescription ? OG_DESCRIPTION_REGEX : DESCRIPTION_REGEX,
    '$1',
  );
};

export const replaceImage = (html: string) => {
  return html.replace(OG_IMAGE_REGEX, '$1');
};

export const matchDescription = (html: string) => {
  const description_html = html.match(DESCRIPTION_REGEX);
  const og_description_html = html.match(OG_DESCRIPTION_REGEX);

  const description = description_html?.at(0);
  const og_description = og_description_html?.at(0);

  // 값을 비교 할 때 값이 존재하는 것을 선택한다.
  if (description && og_description) {
    // 둘을 비교 할 떄 더 긴 것을 선택한다.
    if (description.length > og_description.length) {
      return replaceDescription(description);
    } else {
      return replaceDescription(og_description, true);
    }
  } else if (og_description) {
    return replaceDescription(og_description, true);
  } else if (description) {
    return replaceDescription(description);
  }

  return undefined;
};

export const matchImage = (html: string) => {
  const og_image_html = html.match(OG_IMAGE_REGEX);
  const og_image = og_image_html?.at(0);

  if (og_image) {
    return replaceImage(og_image);
  }

  return undefined;
};

export const getDescription = (html: string) => {
  let description = html ? matchDescription(html) : undefined;
  if (description && HANGUL_BREAK_REGEX.test(description)) {
    description = undefined;
  }
  return description;
};

export const getOgImage = (html: string) => {
  let image = html ? matchImage(html) : undefined;
  if (image && HANGUL_BREAK_REGEX.test(image)) {
    image = undefined;
  }
  return image;
};
