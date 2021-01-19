import React from 'react';
import { Button } from '@aragon/ui';

const CustomButton = ({...props}) => {
  return (
    <Button
      style={{ 
        background: 'linear-gradient(90deg, #DFF4FE 0%, #8EB5FF 100%)',
        boxShadow: '0px 2px 4px rgba(100, 100, 100, 0.498039)',
        color: 'black',
        opacity: props.disabled ? 0.5 : 1
      }}
      {...props}
    />
  )
}

export default CustomButton;