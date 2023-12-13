'use client';
import React from 'react';

export const useUpdate = () => {
  const [, setState] = React.useState({});
  return React.useCallback(() => {
    setState({});
  }, []);
};
