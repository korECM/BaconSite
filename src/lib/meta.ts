import { useEffect } from 'react';
interface TitleProps {
  title: string | (() => string);
}

function Title({ title }: TitleProps) {
  useEffect(() => {
    if (typeof title === 'string') document.title = title;
    else document.title = title();
  });
  return null;
}

export default Title;
