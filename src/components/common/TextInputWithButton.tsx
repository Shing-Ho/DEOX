import React from 'react';

import TextInput from './TextInput';
import Button from './Button';
import styles from './TextInputWithButton.module.scss';

type TextInputWithButtonProps = {
  value: any,
  onChange: Function,
  label: string,
  placeholder?: string,
  disabled?: boolean,
  wide?: boolean,
}

export default function TextInputWithButton({ value, placeholder, wide, onChange, label, disabled }: TextInputWithButtonProps) {
  return (
    <div className={wide ? styles.wide : styles.main}>
      <TextInput width={400} placeholder={placeholder} wide={wide} disabled={disabled} value={value} onChange={onChange} className={styles.textInput} />
      <Button label={label} disabled={disabled} className={styles.button} tooltip />
    </div>
  )
}