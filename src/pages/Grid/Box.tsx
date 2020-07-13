import React, { useRef, useCallback, useContext } from 'react';
import useResizeHandle from './useResizeHandle';
import { PackingGridContext } from './PackingGrid';
import useDragHandle from './useDragHandle';
import useScaleWithItem from './useScaleWithItem';

const Box: React.FC<{ x: number }> = ({ x }) => {
  const { relayout } = useContext(PackingGridContext);

  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useScaleWithItem(containerRef, 32);

  const handleResizeDone = useCallback(() => {
    relayout();
  }, [relayout]);
  useResizeHandle(resizeHandleRef, containerRef, handleResizeDone);

  const dragProps = useDragHandle();

  return (
    <div ref={containerRef} className="relative bg-green-400">
      {x}
      <div {...dragProps} className="absolute right-0 top-0 bg-pink-500 w-2 h-2" />
      <div ref={resizeHandleRef} className="absolute right-0 bottom-0 bg-red-500 w-2 h-2" />
    </div>
  );
};

export default Box;
