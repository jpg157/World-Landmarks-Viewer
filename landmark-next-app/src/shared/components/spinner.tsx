
export type LoadingSpinnerProps = {
  color: string;
  size: number;
};

export const LoadingSpinner = ({
  color,
  size
}: LoadingSpinnerProps) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderBottomColor: "transparent"
      }}
      className={`
        border-3
        border-solid 
        rounded-full 
        box-border
        animate-spin
      `}
    >
    </div>
  )
}

