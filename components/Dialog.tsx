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
  onClose
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  useLayoutEffect(() => {
    if (!anchorRef?.current || !open) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      const rect = anchorRef?.current!.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, anchorRef]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose?.();
    };

    if (open) {
      dialog.showModal();
      dialog.addEventListener('close', handleClose);
    } else {
      dialog.close();
    }

    return () => {
      dialog.removeEventListener('close', handleClose);
    };
  }, [open, onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={`
        bg-white rounded-xl
        overflow-hidden dialog-scrollbar
        backdrop:bg-black/50
        ${position ? 'absolute' : 'relative'}
      `}
      style={{
        top: position?.top ?? undefined,
        left: position?.left ?? undefined,
        margin: position ? 0 : undefined,
      }}
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
