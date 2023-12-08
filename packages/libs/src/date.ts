export const getDateFormatted = (date: Date | string) => {
  const now = new Date();
  const diff =
    now.getTime() -
    (date instanceof Date ? date.getTime() : new Date(date).getTime());

  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffSeconds < 60) {
    return '방금 전';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  if (diffDays < 30) {
    return `${diffDays}일 전`;
  }

  if (diffMonths < 12) {
    return `${diffMonths}달 전`;
  }

  return `${diffYears}년 전`;
};
