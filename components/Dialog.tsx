"use client";
import React, { useEffect, useRef } from 'react';

interface DialogProps extends React.ComponentPropsWithoutRef<"dialog"> {
  isOpen: boolean;
  onClose: () => void;
}

export default function Dialog({ isOpen, onClose, ...restProps }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  return (
    <dialog 
      ref={dialogRef}
      onClose={handleClose}
      className="backdrop:bg-black/40"
      {...restProps}
    >
      <div className="bg-white p-6 rounded-lg">
        <h2>My Dialog</h2>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded">
          Close
        </button>
      </div>
    </dialog>
  )
}
