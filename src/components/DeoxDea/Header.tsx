import React from 'react';
import BigNumber from 'bignumber.js';

import { BalanceBlock } from '../common/index';
import TextBlock from "../common/TextBlock";
import {ownership} from "../../utils/number";
import Button from '../common/Button';
import unihorse from '../../assets/unihorse.png';

type PoolPageHeaderProps = {
  accountUNIBalance: BigNumber,
  accountBondedBalance: BigNumber,
  accountRewardedESDBalance: BigNumber,
  accountClaimableESDBalance: BigNumber,
  poolTotalBonded: BigNumber,
  accountPoolStatus: number,
  unlocked: number,
};

const STATUS_MAP = ["Unlocked", "Locked"];

function status(accountStatus, unlocked) {
  return STATUS_MAP[accountStatus] + (accountStatus === 0 ? "" : " until " + unlocked)
}

const PoolPageHeader = ({
  accountUNIBalance, accountBondedBalance, accountRewardedESDBalance, accountClaimableESDBalance, poolTotalBonded, accountPoolStatus, unlocked
}: PoolPageHeaderProps) => (
  <div style={{ padding: '1% 2% 2% 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
    <div style={{ flexBasis: '15%' }}>
      <BalanceBlock asset="Balance" balance={accountUNIBalance}  suffix={" UNI-V2"}/>
    </div>
    <div style={{ flexBasis: '15%' }}>
      <BalanceBlock asset="Rewarded" balance={accountRewardedESDBalance} suffix={" DEOX"} />
    </div>
    <div style={{ flexBasis: '15%' }}>
      <BalanceBlock asset="Claimable" balance={accountClaimableESDBalance} suffix={" DEOX"} />
    </div>
    <div style={{ flexBasis: '15%' }}>
      <BalanceBlock asset="Pool Ownership" balance={ownership(accountBondedBalance, poolTotalBonded)}  suffix={"%"}/>
    </div>
    <div style={{ flexBasis: '40%', display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ borderRadius: 6, padding: 1, background: 'linear-gradient(90deg, #DFF4FE 0%, #8EB5FF 100%)' }}>
        <Button
          label={<span style={{display: 'flex', alignItems: 'center'}}>provide Liquidity <img src={unihorse} style={{width: 14, height: 15, marginLeft: 10}} /> </span>}
          style={{
            filter: 'drop-shadow(0px 2px 4px rgba(100, 100, 100, 0.498039))',
            background: '#000',
            borderRadius: 6,
          }}
        />
      </div>
    </div>
  </div>
);


export default PoolPageHeader;
