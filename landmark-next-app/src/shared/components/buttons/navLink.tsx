import { mergeTwClassnames } from "@/shared/lib/mergeClassnames";
import type { ComponentProps } from "react";
import Link from "next/link";

// Gets the full prop type used by the <Link> component
type NextLinkProps = ComponentProps<typeof Link>;

export const NavLink = ({
  children,
  ...props
}: NextLinkProps) => {
  return (
    <Link 
      {...props}
      className={mergeTwClassnames(
        `rounded-full px-5 py-1 roboto ${props.className}`
      )}
    >
      {children}
    </Link>
  )
}
