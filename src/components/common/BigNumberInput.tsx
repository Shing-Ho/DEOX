import React from 'react';

import BigNumber from 'bignumber.js';
import {
  TextInput,
} from '@aragon/ui';
import styles from './BigNumberInput.module.scss';

type BigNumberInputProps = {
  value: BigNumber,
  setter: (value: BigNumber) => void
  adornment?: any,
  disabled?: boolean
}

function BigNumberInput({ value, setter, adornment, disabled=false }: BigNumberInputProps) {
  return (
    <div className={styles.main}>
      <TextInput
        type="number"
        adornmentPosition="end"
        adornment={adornment}
        wide
        value={value.isNegative() ? '' : value.toFixed()}
        onChange={(event) => {
          if (event.target.value) {
            setter(new BigNumber(event.target.value));
          } else {
            setter(new BigNumber(-1));
          }
        }}
        onBlur={() => {
          if (value.isNegative()) {
            setter(new BigNumber(0))
          }
        }}
        disabled={disabled}
        style={{ backgroundColor: 'transparent', borderColor: '#1b1b1b' }}
      />
    </div>
  );
}

export default BigNumberInput;
