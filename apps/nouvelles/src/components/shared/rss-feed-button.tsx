import React, { useMemo } from 'react';
import { Button } from '~/components/ui/button';
import { Icons } from '~/components/icons';
import { API_ENDPOINTS } from '~/constants/constants';

interface RssFeedButtonProps {
  type: 'tags' | 'categories' | 'today' | 'newspaper' | 'placeholders';
  slug?: string;
}

export default function RssFeedButton({ type, slug }: RssFeedButtonProps) {
  const href = useMemo(() => {
    switch (type) {
      case 'tags':
        if (!slug) {
          throw new Error('slug is required');
        }
        return API_ENDPOINTS.rss.tags(slug);
      case 'categories':
        if (!slug) {
          throw new Error('slug is required');
        }
        return API_ENDPOINTS.rss.categories(slug);
      case 'newspaper':
        if (!slug) {
          throw new Error('slug is required');
        }
        return API_ENDPOINTS.rss.newspapers(slug);
      case 'today':
        return API_ENDPOINTS.rss.today;
      case 'placeholders': {
        return '#';
      }
      default:
        throw new Error('invalid type');
    }
  }, [type, slug]);

  return (
    <a href={href} rel="noreferrer noopener" target="_blank">
      <Button size="icon" variant="outline">
        <Icons.rss />
      </Button>
    </a>
  );
}
