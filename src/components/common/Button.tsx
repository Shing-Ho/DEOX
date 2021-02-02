import React from 'react';
import { Button } from '@aragon/ui';

import tooltip from '../../assets/tooltip.png';

import styles from './Button.module.scss';

const CustomButton = ({ inputButton=false, ...props}) => {
  const width = 
    props.label === 'approve'
      ? 155
      : props.label === 'Lock' || props.label === 'Unlock'
        ? 130
        : props.label === 'Claim'
          ? 300
          : 155;
  const absoluteStyle = inputButton ? {position: 'absolute', left: -3} : {}
  return (
    <div className={styles.buttonDiv}>
      <Button
        style={{ 
          background: 'linear-gradient(90deg, #DFF4FE 0%, #8EB5FF 100%)',
          boxShadow: '0px 2px 4px rgba(100, 100, 100, 0.498039)',
          color: 'black',
          opacity: props.disabled ? 0.5 : 1,
          border: '1px solid',
          borderRadius: 6,
          width: width,
          fontSize: 15,
          ...absoluteStyle
        }}
        {...props}
      >
        {props.label}
      </Button>
      {/* {props.tooltip ? (
        <div className={styles.tooltip}>
          <img src={tooltip} alt="tooltip" />
        </div>
      ) : null} */}
    </div>
  )
}

export default CustomButton;