import slugifyCJK from 'cjk-slug';
import dayjs from 'dayjs';
import { isInvaliDate } from '@nouvelles/libs';

function replaceSlash(slug: string) {
  return slug.replace(/\//g, '-');
}

function hasSlash(slug: string) {
  return slug.includes('/');
}

function isURL(text: string) {
  const urlRegex = /(?<temp1>https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}

export function getSlug(text: string) {
  if (hasSlash(text)) {
    const slug = slugifyCJK(replaceSlash(text), {
      lowercase: true,
    });
    return slug;
  }
  const slug = slugifyCJK(text, {
    lowercase: true,
  });
  return slug;
}

export function generateImageURL({
  realLink,
  image,
}: {
  realLink?: string;
  image?: string;
}) {
  if (!realLink || !image) {
    return null;
  }

  if (isURL(image)) {
    return image;
  }

  const nextURL = new URL(realLink, image);
  return nextURL.toString();
}

export function generateDate(date: string | undefined) {
  if (!date) {
    return undefined;
  }
  const dateString = dayjs(date, 'YY.MM.DD').format('YYYY-MM-DD HH:mm:ss');
  const dateTime = dayjs(dateString).toDate();
  if (isInvaliDate(dateTime)) {
    return undefined;
  }
  return dateTime;
}
