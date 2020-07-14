import React, { useRef } from 'react';

import useItem from './useItem';

const Box: React.FC<{ x: number }> = ({ x }) => {
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const height = 32;

  const { dragProps } = useItem({
    containerRef,
    resizeHandleRef,
    height,
  });

  return (
    <div ref={containerRef} className="relative bg-green-400">
      {x}
      <div {...dragProps} className="absolute right-0 top-0 bg-pink-500 w-2 h-2" />
      <div ref={resizeHandleRef} className="absolute right-0 bottom-0 bg-red-500 w-2 h-2" />
    </div>
  );
};

export default Box;
