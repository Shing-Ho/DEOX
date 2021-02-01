import React, { useState } from 'react';
import {
  Box, IconArrowDown
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {
  BalanceBlock, MaxButton,
} from '../common/index';
import {claimPool} from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import {ESD} from "../../constants/tokens";
import BigNumberInput from "../common/BigNumberInput";
import TextBlock from "../common/TextBlock";
import Button from '../common/Button';

type ClaimProps = {
  poolAddress: string
  claimable: BigNumber,
  status: number,
  lockup: number
};

function Claim({
  poolAddress, claimable, status, lockup
}: ClaimProps) {
  const [claimAmount, setClaimAmount] = useState(new BigNumber(0));

  return (
    <Box style={{ backgroundColor: '#0d0d0d', borderColor: '#1b1b1b' }}>
      <div style={{ borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#868686', width: '100%', fontFamily: 'Edu Monument Grotesk Semi-Mono', fontSize: 12, marginBottom: 15, paddingBottom: 5 }}>
        CLAIM
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {/* total Issued */}
        <div style={{flexBasis: '16%'}}>
          <BalanceBlock asset="Claimable" balance={claimable} suffix={"DEOX"} />
        </div>
        <div style={{flexBasis: '16%'}}>
          <TextBlock label="Exit Lockup" text={lockup === 0 ? "" : lockup === 1 ? "1 epoch" : `${lockup} epochs`}/>
        </div>
        {/* Deposit UNI-V2 into Pool */}
        <div style={{flexBasis: '35%'}}/>
        <div style={{flexBasis: '33%', paddingTop: '2%'}}>
          <div style={{display: 'flex'}}>
            <div style={{width: '60%', minWidth: '6em'}}>
              <>
                <BigNumberInput
                  adornment={
                    <MaxButton
                      onClick={() => {
                        setClaimAmount(claimable);
                      }}
                    />
                  }
                  suffix="DEOX"
                  value={claimAmount}
                  setter={setClaimAmount}
                  disabled={status !== 0}
                />
              </>
            </div>
            <div style={{width: '40%', minWidth: '6em'}}>
              <Button
                wide
                label="Claim"
                onClick={() => {
                  claimPool(
                    poolAddress,
                    toBaseUnitBN(claimAmount, ESD.decimals),
                    (hash) => setClaimAmount(new BigNumber(0))
                  );
                }}
                disabled={poolAddress === '' || status !== 0 || !isPos(claimAmount)}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{width: '100%', paddingTop: '2%', textAlign: 'center'}}>
        <span style={{ opacity: 0.5 }}> Unbond to make rewards claimable after your status is Unlocked </span>
      </div>
    </Box>
  );
}

export default Claim;
