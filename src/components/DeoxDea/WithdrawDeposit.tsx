import React, { useState } from 'react';
import {
  Box, IconCirclePlus, IconCircleMinus, IconLock
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {
  BalanceBlock, MaxButton,
} from '../common/index';
import {approve, depositPool, withdrawPool} from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import {UNI} from "../../constants/tokens";
import {MAX_UINT256} from "../../constants/values";
import BigNumberInput from "../common/BigNumberInput";
import Button from "../common/Button";

type WithdrawDepositProps = {
  poolAddress: string
  user: string
  balance: BigNumber,
  allowance: BigNumber,
  stagedBalance: BigNumber,
  status: number
};

function WithdrawDeposit({
  poolAddress, user, balance, allowance, stagedBalance, status
}: WithdrawDepositProps) {
  const [depositAmount, setDepositAmount] = useState(new BigNumber(0));
  const [withdrawAmount, setWithdrawAmount] = useState(new BigNumber(0));
  console.log('poolAddress', poolAddress)
  console.log('user', user)
  return (
    <Box style={{ backgroundColor: '#0d0d0d', borderColor: '#1b1b1b' }}>
      <div style={{ borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#868686', width: '100%', fontFamily: 'Edu Monument Grotesk Semi-Mono', fontSize: 12, marginBottom: 15, paddingBottom: 5 }}>
        STAGE
      </div>
      {allowance.comparedTo(MAX_UINT256) === 0 ?
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {/* total Issued */}
          <div style={{flexBasis: '32%'}}>
            <BalanceBlock asset="Staged" balance={stagedBalance} suffix={"UNI-V2"}/>
          </div>
          {/* Deposit UNI-V2 into Pool */}
          <div style={{flexBasis: '33%', paddingTop: '2%'}}>
            <div style={{display: 'flex'}}>
              <div style={{width: '60%', minWidth: '6em'}}>
                <>
                  <BigNumberInput
                    adornment="UNI-V2"
                    value={depositAmount}
                    setter={setDepositAmount}
                    disabled={status !== 0}
                  />
                  <MaxButton
                    onClick={() => {
                      setDepositAmount(balance);
                    }}
                  />
                </>
              </div>
              <div style={{width: '40%', minWidth: '7em'}}>
                <Button
                  label="Deposit"
                  onClick={() => {
                    depositPool(
                      poolAddress,
                      toBaseUnitBN(depositAmount, UNI.decimals),
                      (hash) => setDepositAmount(new BigNumber(0))
                    );
                  }}
                  disabled={poolAddress === '' || status !== 0 || !isPos(depositAmount)}
                />
              </div>
            </div>
          </div>
          <div style={{flexBasis: '2%'}}/>
          {/* Withdraw Døllar from DAO */}
          <div style={{flexBasis: '33%', paddingTop: '2%'}}>
            <div style={{display: 'flex'}}>
              <div style={{width: '60%', minWidth: '6em'}}>
                <>
                  <BigNumberInput
                    adornment="UNI-V2"
                    value={withdrawAmount}
                    setter={setWithdrawAmount}
                    disabled={status !== 0}
                  />
                  <MaxButton
                    onClick={() => {
                      setWithdrawAmount(stagedBalance);
                    }}
                  />
                </>
              </div>
              <div style={{width: '40%', minWidth: '7em'}}>
                <Button
                  wide
                  label="Withdraw"
                  onClick={() => {
                    withdrawPool(
                      poolAddress,
                      toBaseUnitBN(withdrawAmount, UNI.decimals),
                      (hash) => setWithdrawAmount(new BigNumber(0))
                    );
                  }}
                  disabled={poolAddress === '' || status !== 0 || !isPos(withdrawAmount)}
                />
              </div>
            </div>
          </div>
        </div>
        :
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {/* total Issued */}
          <div style={{flexBasis: '32%'}}>
            <BalanceBlock asset="Staged" balance={stagedBalance} suffix={"UNI-V2"}/>
          </div>
          <div style={{flexBasis: '35%'}}/>
          {/* Approve Pool to spend UNI-V2 */}
          <div style={{flexBasis: '33%', paddingTop: '2%', display: 'flex', justifyContent: 'flex-end'}}>
            <Button
              label="Approve"
              onClick={() => {
                approve(UNI.addr, poolAddress);
              }}
              disabled={poolAddress === '' || user === ''}
            />
          </div>
        </div>
      }
    </Box>
  );
}

export default WithdrawDeposit;
