import { cn } from '@/lib/utils';
import React, {
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type PositionStrategy = 'center' | 'anchor';

type DialogProps = {
  anchorRef?: React.RefObject<HTMLElement | HTMLButtonElement | null>;
  onClose: () => void;
  positionStrategy?: PositionStrategy;
  offset?: { x: number; y: number };
  placement?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  useParentHorizontalPaddingAsOffset?: boolean;
} & React.ComponentPropsWithoutRef<'dialog'>;

const Dialog: React.FC<DialogProps> = ({
  children,
  anchorRef,
  open,
  onClose,
  className,
  positionStrategy = 'center',
  offset = { x: 0, y: 0 },
  placement = 'bottom-right',
  useParentHorizontalPaddingAsOffset = false // New prop
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(
    positionStrategy === 'anchor' ? null : { top: 0, left: 0 }
  );
  const [isMdScreen, setIsMdScreen] = useState(false);

  useLayoutEffect(() => {
    const checkScreenSize = () => {
      setIsMdScreen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose?.();
    };

    if (open) {
      dialog.showModal();
      dialog.addEventListener('close', handleClose);
      window.document.body.classList.add("overflow-hidden");
      
      if (positionStrategy === 'anchor' && anchorRef?.current && isMdScreen) {
        requestAnimationFrame(() => {
          updatePosition();
        });
      }
    } else {
      dialog.close();
      setPosition(null);
    }

    return () => {
      dialog.removeEventListener('close', handleClose);
      window.document.body.classList.remove("overflow-hidden");
    };
  }, [open, onClose, isMdScreen, positionStrategy]);

  const updatePosition = () => {
    if (positionStrategy !== 'anchor' || !anchorRef?.current || !dialogRef.current || !isMdScreen) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const dialogRect = dialogRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let horizontalPadding = 0;
    if (useParentHorizontalPaddingAsOffset && anchorRef.current) {
      const computedStyle = getComputedStyle(anchorRef.current);
      if (placement.includes('right')) {
        horizontalPadding = parseFloat(computedStyle.paddingRight) || 0;
      } else if (placement.includes('left')) {
        horizontalPadding = parseFloat(computedStyle.paddingLeft) || 0;
      }
    }

    // Add horizontal padding to the offset
    const effectiveOffset = {
      x: offset.x + horizontalPadding,
      y: offset.y
    };
    
    let top: number;
    let left: number;

    // Calculate position based on placement using effectiveOffset
    switch (placement) {
      case 'bottom-right':
        top = anchorRect.bottom + scrollY + effectiveOffset.y;
        left = anchorRect.right + scrollX - dialogRect.width - effectiveOffset.x;
        break;
      case 'bottom-left':
        top = anchorRect.bottom + scrollY + effectiveOffset.y;
        left = anchorRect.left + scrollX + effectiveOffset.x;
        break;
      case 'top-right':
        top = anchorRect.top + scrollY - dialogRect.height - effectiveOffset.y;
        left = anchorRect.right + scrollX - dialogRect.width - effectiveOffset.x;
        break;
      case 'top-left':
        top = anchorRect.top + scrollY - dialogRect.height - effectiveOffset.y;
        left = anchorRect.left + scrollX + effectiveOffset.x;
        break;
      default:
        top = anchorRect.bottom + scrollY + effectiveOffset.y;
        left = anchorRect.right + scrollX - dialogRect.width - effectiveOffset.x;
    }

    // Keep existing boundary checks with original parentPaddingRight logic
    let parentPaddingRight = 0;
    if (anchorRef.current?.parentElement) {
      const computedStyle = getComputedStyle(anchorRef.current.parentElement);
      parentPaddingRight = parseFloat(computedStyle.paddingRight) || 0;
    }

    const minLeft = scrollX;
    const maxLeft = scrollX + viewportWidth - dialogRect.width - parentPaddingRight;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    const minTop = scrollY;
    const maxTop = scrollY + viewportHeight - dialogRect.height;
    top = Math.max(minTop, Math.min(top, maxTop));

    setPosition({ top, left });
  };

  useLayoutEffect(() => {
    if (!open || positionStrategy !== 'anchor' || !anchorRef?.current || !isMdScreen) return;

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [open, anchorRef, isMdScreen, positionStrategy]);

  const shouldUsePositioning = position && anchorRef?.current && isMdScreen && positionStrategy === 'anchor';
  const shouldCenter = !isMdScreen || positionStrategy === 'center';
  
  const dialogClasses = cn(
    "bg-white overflow-hidden backdrop:bg-black/40",
    {
      "absolute": shouldUsePositioning,
      "fixed": !shouldUsePositioning,
      "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2": shouldCenter,
      "invisible": positionStrategy === 'anchor' && isMdScreen && !position
    },
    [className]
  )
  return (
    <dialog
      ref={dialogRef}
      className={dialogClasses}
      style={shouldUsePositioning ? {
        top: position.top,
        left: position.left,
        margin: 0,
      } : undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
    >
      {children}
    </dialog>
  );
};

export default Dialog;
