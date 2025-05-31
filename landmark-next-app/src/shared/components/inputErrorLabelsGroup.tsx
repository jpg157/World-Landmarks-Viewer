import React from 'react'
import InputErrorLabel from './inputErrorLabel';

export type InputErrorLabelsGroupProps = {
  errorMessages: string[];
};

export const InputErrorLabelsGroup = ({errorMessages}: InputErrorLabelsGroupProps) => {
  return (
    <div>
      {
      errorMessages.map(((errorMessage, index) => {
        return (
          <InputErrorLabel
            key={index}
            errorMessage={errorMessage}
          />
        );
      }))
      }
    </div>
  )
}

export default InputErrorLabelsGroup