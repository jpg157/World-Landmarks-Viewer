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
        `rounded-full px-6 py-1 text-lg roboto hover:text-fuchsia-600 hover:bg-gray-50 ${props.className}`
      )}
    >
      {children}
    </Link>
  )
}
