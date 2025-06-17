import Image from 'next/image'
import closeIcon from '@/images/close-icon.svg';
import { mergeTwClassnames } from '@/shared/lib/mergeClassnames';

export type CloseIconButtonProps = {
  onClick: () => void;
  className?: string
};

export const CloseIconButton = ({
  onClick,
  className
}: CloseIconButtonProps) => {
  return (
    <button 
      className={mergeTwClassnames(
        `w-[25px] h-[25px] hover: cursor-pointer ${className}`
      )}
      type='button'
      onClick={onClick}
    >
      <Image
        priority={true}
        src={closeIcon}
        alt={'closeIcon'}
        className='w-full h-full'
      />
    </button>
  )
}
