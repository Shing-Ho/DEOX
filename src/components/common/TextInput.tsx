import React from 'react';
import { TextInput } from '@aragon/ui';

import styles from './TextInput.module.scss'

type TextIntpuProps = {
  className?: any
  placeholder?: string
  value: any,
  onChange: Function
  disabled?: boolean,
  wide?: boolean,
}

const CustomTextInput = ({className, disabled, wide, ...props}: TextIntpuProps) => {
  return (
    <TextInput
      style= {{
        background: '#0D0D0D',
        border: '1px solid #868686',
        width: wide? '100%' : 300,
        borderRadius: 6,
        color: 'white'
      }}
      className={[styles.textInput, className]}
      {...props}
      disabled={disabled}
    />
  )
}

export default CustomTextInput;