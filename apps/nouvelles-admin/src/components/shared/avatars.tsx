import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

interface AvatarsProps {
  src?: string;
  alt?: string;
  fallback?: string;
}

export default function Avatars({ src, alt, fallback }: AvatarsProps) {
  return (
    <Avatar>
      <AvatarImage alt={alt} loading="lazy" src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
