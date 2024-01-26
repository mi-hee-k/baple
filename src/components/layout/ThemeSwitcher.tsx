import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Switch } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/react';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  const themeToggleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      setTheme('baple');
    } else {
      setTheme('soviet');
    }
  };
  if (!mounted) return null;

  return <Switch defaultSelected onChange={themeToggleHandler} />;
};

export default ThemeSwitcher;
