import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { CloseIconButton } from './buttons/closeIconButton';
import { mergeTwClassnames } from '../lib/mergeClassnames';

export type ModalProps = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  children: React.JSX.Element;
  className?: string;
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  className
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className='relative z-50'>
      <div className='fixed inset-0 flex w-screen items-center justify-center p-5 bg-black/80'>
        <DialogPanel 
          className={mergeTwClassnames(
            `shadow-black bg-white p-10 rounded-md relative ${className}`
          )}
        >
          <CloseIconButton onClick={() => onClose(false)} className='absolute top-2 right-2'/>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export const ModalTitle = ({
  title
}: { title: string }) => {
  return (
    <DialogTitle className='inline-block text-lg md:text-2xl roboto text-center'>{title}</DialogTitle>
  );
}

export const ModalDescription = ({
  children
}: { children: React.JSX.Element }) => {
  return (
    <Description className='text-center'>{children}</Description>
  );
}

