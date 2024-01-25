import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: '(max-width: 768px)' });
  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);

  return isMobile;
};
