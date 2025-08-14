import React, {
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type DialogProps = {
  anchorRef?: React.RefObject<HTMLElement | HTMLButtonElement | null>;
  onClose: () => void;
} & React.ComponentPropsWithoutRef<'dialog'>;

const Dialog: React.FC<DialogProps> = ({
  children,
  anchorRef,
  open,
  onClose,
  className
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
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
      
      if (anchorRef?.current && isMdScreen) {
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
    };
  }, [open, onClose, isMdScreen]);

  const updatePosition = () => {
    if (!anchorRef?.current || !dialogRef.current || !isMdScreen) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const dialogRect = dialogRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let parentPaddingRight = 0;
    if (anchorRef.current?.parentElement) {
      const computedStyle = getComputedStyle(anchorRef.current.parentElement);
      parentPaddingRight = parseFloat(computedStyle.paddingRight) || 0;
    }
    
    const top = anchorRect.bottom + scrollY + 8;
    let left = anchorRect.right + scrollX - dialogRect.width;
    const minLeft = scrollX + 16;
    left = Math.max(left, minLeft);
    const maxLeft = scrollX + viewportWidth - dialogRect.width - parentPaddingRight - 16;
    left = Math.min(left, maxLeft);

    setPosition({ top, left: left + 15 });
  };

  useLayoutEffect(() => {
    if (!open || !anchorRef?.current || !isMdScreen) return;

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [open, anchorRef, isMdScreen]);

  const shouldUsePositioning = position && anchorRef?.current && isMdScreen;

  return (
    <dialog
      ref={dialogRef}
      className={`
        bg-white rounded-xl
        overflow-hidden
        backdrop:bg-black/40
        ${shouldUsePositioning ? 'md:absolute' : 'fixed'}
        ${!shouldUsePositioning ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
        ${className ? className : ''}
      `}
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
