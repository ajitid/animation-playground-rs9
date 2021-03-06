import React, {
  useContext,
  useEffect,
  useRef,
  MutableRefObject,
  createContext,
} from 'react';

import { PackingGridContext } from './PackingGrid';

interface ItemContextShape {
  itemRef: MutableRefObject<HTMLDivElement | null>;
  xUnit: number;
  yUnit: number;
  itemId: string;
}

export const ItemContext = createContext<ItemContextShape>({
  itemRef: { current: null },
  xUnit: 1,
  yUnit: 1,
  itemId: '',
});

type ElAttrs = Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;

interface ItemProps extends ElAttrs {
  itemId: string;
  xUnit?: number;
  yUnit?: number;
}

const Item: React.FC<ItemProps> = ({
  children,
  className,
  style,
  itemId,
  xUnit = 1,
  yUnit = 1,
}) => {
  const { grid } = useContext(PackingGridContext);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!grid || !el) return;

    const items = grid.add(el);

    return () => {
      grid.remove(items);
    };
  }, [grid]);

  return (
    <div
      data-grid-item-id={itemId}
      ref={itemRef}
      className={`${className ?? ''} absolute`}
      style={style}
    >
      <ItemContext.Provider value={{ itemRef, xUnit, yUnit, itemId }}>
        {children}
      </ItemContext.Provider>
    </div>
  );
};

export default Item;
