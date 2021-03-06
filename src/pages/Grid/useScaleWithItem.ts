import { useEffect, useContext, RefObject } from 'react';

import { PackingGridContext } from './PackingGrid';
import { ItemContext } from './Item';
import clamp from 'flicky/utils/clamp';

const useScaleWithItem = (itemContentBlockRef: RefObject<HTMLElement>, height: number) => {
  const { relayout, cols, gridWidth } = useContext(PackingGridContext);
  const { itemRef, xUnit, yUnit } = useContext(ItemContext);

  useEffect(() => {
    const item = itemRef.current;
    const itemContentBlock = itemContentBlockRef.current;
    if (!item || !itemContentBlock || gridWidth === 0) return;

    const computed = getComputedStyle(item);

    // As positioned absolute, these margins don't collapse,
    // instead they act like padding because Muuri made it to
    // behave them like that
    const itemMargins = {
      top: parseFloat(computed.marginTop.replace('px', '')),
      bottom: parseFloat(computed.marginBottom.replace('px', '')),
      left: parseFloat(computed.marginLeft.replace('px', '')),
      right: parseFloat(computed.marginRight.replace('px', '')),
    };

    const clampedXUnit = clamp(1, cols, xUnit);
    const excessWidth = itemMargins.left + itemMargins.right;
    itemContentBlock.style.width = `${(gridWidth / cols) * clampedXUnit - excessWidth}px`;

    // As margins don't collapse and rather they remain separated like padding,
    // so instead of finding max of top and bottom, we'll add them up
    const extraHeightPerUnit = itemMargins.top + itemMargins.bottom;
    itemContentBlock.style.height = `${
      height * yUnit + extraHeightPerUnit * (yUnit - 1)
    }px`;
    relayout();
  }, [cols, itemContentBlockRef, gridWidth, relayout, itemRef, xUnit, height, yUnit]);
};

export default useScaleWithItem;
