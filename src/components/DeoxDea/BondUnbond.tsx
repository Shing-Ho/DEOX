import React, { useState } from 'react';
import {
  Box, IconCirclePlus, IconCircleMinus, IconCaution
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {
  BalanceBlock, MaxButton,
} from '../common/index';
import {bondPool, unbondPool} from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import {UNI} from "../../constants/tokens";
import BigNumberInput from "../common/BigNumberInput";
import TextBlock from "../common/TextBlock";
import Button from '../common/Button';

type BondUnbondProps = {
  poolAddress: string,
  staged: BigNumber,
  bonded: BigNumber,
  status: number,
  lockup: number,
};

function BondUnbond({
  poolAddress, staged, bonded, status, lockup
}: BondUnbondProps) {
  const [bondAmount, setBondAmount] = useState(new BigNumber(0));
  const [unbondAmount, setUnbondAmount] = useState(new BigNumber(0));

  return (
    <Box style={{ backgroundColor: '#0d0d0d', borderColor: '#1b1b1b' }}>
      <div style={{ borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#868686', width: '100%', fontFamily: 'Edu Monument Grotesk Semi-Mono', fontSize: 12, marginBottom: 15, paddingBottom: 5 }}>
        BOND
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', paddingTop: '1%'}}>
        {/* Total bonded */}
        <div style={{flexBasis: '16%'}}>
          <BalanceBlock asset="Bonded" balance={bonded} suffix={"UNI-V2"} />
        </div>
        {/* Exit lockup */}
        <div style={{flexBasis: '16%'}}>
          <TextBlock label="Exit Lockup" text={lockup === 0 ? "" : lockup === 1 ? "1 epoch" : `${lockup} epochs`}/>
        </div>
        {/* Bond UNI-V2 within Pool */}
        <div style={{flexBasis: '33%'}}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <div style={{width: '60%', minWidth: '6em'}}>
              <>
                <BigNumberInput
                  adornment={
                    <MaxButton
                      onClick={() => {
                        setBondAmount(staged);
                      }}
                    />
                  }
                  suffix="BPT"
                  value={bondAmount}
                  setter={setBondAmount}
                />
              </>
            </div>
            <div style={{minWidth: 130}}>
              <Button
                wide
                label="Lock"
                onClick={() => {
                  bondPool(
                    poolAddress,
                    toBaseUnitBN(bondAmount, UNI.decimals),
                    (hash) => setBondAmount(new BigNumber(0))
                  );
                }}
                inputButton
                disabled={poolAddress === '' || !isPos(bondAmount)}
              />
            </div>
          </div>
        </div>
        <div style={{flexBasis: '2%'}}/>
        {/* Unbond UNI-V2 within Pool */}
        <div style={{flexBasis: '33%'}}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <div style={{width: '60%', minWidth: '6em'}}>
              <>
                <BigNumberInput
                  adornment={
                    <MaxButton
                      onClick={() => {
                        setUnbondAmount(bonded);
                      }}
                    />
                  }
                  suffix="BPT"
                  value={unbondAmount}
                  setter={setUnbondAmount}
                />
              </>
            </div>
            <div style={{minWidth: 130}}>
              <Button
                wide
                label="Unlock"
                onClick={() => {
                  unbondPool(
                    poolAddress,
                    toBaseUnitBN(unbondAmount, UNI.decimals),
                    (hash) => setUnbondAmount(new BigNumber(0))
                  );
                }}
                inputButton
                disabled={poolAddress === '' || !isPos(unbondAmount)}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{width: '100%', paddingTop: '2%', textAlign: 'center', marginTop: 50}}>
        <span style={{ opacity: 0.5 }}> Looking events will restart the lookup timer </span>
      </div>
    </Box>
  );
}

export default BondUnbond;
