import React, { FC, ChangeEvent, InputHTMLAttributes } from 'react'

import './styles.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  changeState?: React.Dispatch<React.SetStateAction<any>>
}

const Inputs: FC<Props> = ({ label, name, changeState, ...rest }) => {
  function OnChangeEvent(event: ChangeEvent<HTMLInputElement>) {
    if (changeState)
      return changeState(event.target.value)
  }

  return (
    <div className="input-block">
      <label htmlFor={name}> {label} </label>
      <input id={name} {...rest} { ...changeState ? rest.onChange=OnChangeEvent : '' } />
    </div>
  )
}

export default Inputs