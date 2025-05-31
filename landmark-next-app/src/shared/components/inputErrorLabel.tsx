import React from 'react'

type InputErrorLabelProps = {
  errorMessage: string;
};

const InputErrorLabel = ({errorMessage}: InputErrorLabelProps) => {
  return (
    <div className='text-error text-sm rounded-sm p-1'>{errorMessage}</div>
  )
}

export default InputErrorLabel