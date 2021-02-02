import React, { useState } from 'react';
import {
  Box, IconCirclePlus, IconCircleMinus, IconCaution
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {
  BalanceBlock, MaxButton,
} from '../common/index';
import { bond, unbondUnderlying } from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import { ESD, ESDS } from "../../constants/tokens";
import BigNumberInput from "../common/BigNumberInput";
import TextBlock from "../common/TextBlock";
import Button from '../common/Button';
import styles from './BondUnbond.module.scss';

type BondUnbondProps = {
  staged: BigNumber,
  bonded: BigNumber,
  status: number,
  lockup: number,
};

function BondUnbond({
  staged, bonded, status, lockup
}: BondUnbondProps) {
  const [bondAmount, setBondAmount] = useState(new BigNumber(0));
  const [unbondAmount, setUnbondAmount] = useState(new BigNumber(0));

  return (
    <Box style={{ backgroundColor: '#0d0d0d', borderColor: '#1b1b1b' }}>
      <div style={{ borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#868686', width: '100%', fontFamily: 'Edu Monument Grotesk Semi-Mono', fontSize: 12, marginBottom: 15, paddingBottom: 5 }}>
        BOND
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
        {/* Total bonded */}
        <div style={{flexBasis: '16%'}} className={styles.bonded}>
          <BalanceBlock asset="Bonded" balance={bonded} suffix={"DEOX"}/>
        </div>
        {/* Total bonded */}
        <div style={{flexBasis: '16%'}} className={styles.exitLookup}>
          <TextBlock label="Exit Lockup" text={lockup === 0 ? "" : lockup === 1 ? "1 epoch" : `${lockup} epochs`}/>
        </div>
        {/* Bond Døllar within DAO */}
        <div style={{flexBasis: '33%'}} className={styles.textInputBox}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <div style={{width: '60%', minWidth: '6em'}}>
              <>
                <BigNumberInput
                  adornment={
                    <MaxButton
                      onClick={() => {
                        setBondAmount(staged);
                      }}
                    />}
                  suffix="DEOX"
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
                  bond(
                    ESDS.addr,
                    toBaseUnitBN(bondAmount, ESD.decimals),
                  );
                }}
                inputButton
                disabled={status === 2 || !isPos(bondAmount) || bondAmount.isGreaterThan(staged)}
              />
            </div>
          </div>
        </div>
        <div style={{width: '2%'}} />
        {/* Unbond Døllar within DAO */}
        <div style={{flexBasis: '33%'}} className={styles.textInputBox}>
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
                  suffix="DEOX"
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
                  unbondUnderlying(
                    ESDS.addr,
                    toBaseUnitBN(unbondAmount, ESD.decimals),
                  );
                }}
                inputButton
                disabled={status === 2 || !isPos(unbondAmount) || unbondAmount.isGreaterThan(bonded)}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{width: '100%', paddingTop: '2%', textAlign: 'center', fontSize: 14, marginTop: 70, marginBottom: 20}}>
        <span style={{ opacity: 0.5 }}> Bonding events will restart the lockup timer </span>
      </div>
    </Box>
  );
}

export default BondUnbond;
