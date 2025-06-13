import { mergeTwClassnames } from "@/shared/lib/mergeClassnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button 
      {...props}
      className={mergeTwClassnames(
        `hover:cursor-pointer rounded-full px-6 py-1 text-md roboto text-center ${className}`
      )}
    >
      {children}
    </button>
  )
}
