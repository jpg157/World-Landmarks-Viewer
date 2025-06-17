import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Button } from './buttons/button';
import { CloseIconButton } from './buttons/closeIconButton';

export type ConfirmationDialogProps = {
  title: string;
  confirmationMessage: string;
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onConfirm: () => void;
};

export const ConfirmationDialog = ({
  title,
  confirmationMessage,
  isOpen,
  onClose,
  onConfirm
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className='relative z-50'>
      <div className='fixed inset-0 flex w-screen items-center justify-center p-5 bg-black/80'>
        <DialogPanel className='max-w-lg space-y-4 shadow-black bg-white p-10 rounded-md relative'>
          <CloseIconButton onClick={() => onClose(false)} className='absolute top-2 right-2'/>
          <DialogTitle className='text-center font-bold'>{title}</DialogTitle>
          <Description className='text-center'>{confirmationMessage}</Description>
          <div className="flex items-center justify-center gap-4">
            <Button 
              onClick={() => onClose(false)} 
              className={`
                rounded-md
                text-sm md:text-base 
                md:px-2 md:py-2
                bg-app-secondary hover:bg-app-tertiary text-app-primary-text`}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                onConfirm();
                onClose(false);
              }} 
              className={`
                rounded-md
                text-sm md:text-base 
                md:px-2 md:py-2
              bg-app-destructive text-white`}
            >
              Confirm
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

