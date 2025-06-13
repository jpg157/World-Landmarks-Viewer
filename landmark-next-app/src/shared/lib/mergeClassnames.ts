import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export const mergeTwClassnames = (classNames: string) => {
  return twMerge(clsx(classNames));
}
