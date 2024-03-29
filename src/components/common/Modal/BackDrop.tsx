import { HTMLAttributes } from 'react';
import { zIndexes } from '../../../styles/variables/zIndexes';
import useBlockingScroll from '../../../hooks/useBlockingScroll';
import { screenSize } from '../../../styles/common/screenSize';

interface Props {
  isOpen: boolean;
  onClick?: HTMLAttributes<HTMLDivElement>['onClick'];
}

export default function BackDrop({ isOpen, onClick }: Props) {
  useBlockingScroll(isOpen);

  return (
    <div
      onClick={onClick}
      css={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: zIndexes.BACKDROP,
        display: isOpen ? 'block' : 'none',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        ...screenSize,
      }}
    ></div>
  );
}
