import { mergeTwClassnames } from "@/shared/lib/mergeClassnames";
import { ButtonHTMLAttributes } from "react";

export const Button = ({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button 
      {...props}
      className={mergeTwClassnames(
        `hover:cursor-pointer px-6 py-1 roboto text-center ${props.className}`
      )}
    >
      {props.children}
    </button>
  )
}
