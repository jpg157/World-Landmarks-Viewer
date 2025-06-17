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
        `hover:cursor-pointer px-6 py-1 roboto text-center ${className}`
      )}
    >
      {children}
    </button>
  )
}
