import React from 'react';
import BigNumber from 'bignumber.js';

import { BalanceBlock } from '../common/index';
import TextBlock from "../common/TextBlock";
import {ownership} from "../../utils/number";
import styles from './Header.module.scss';

type AccountPageHeaderProps = {
  accountESDBalance: BigNumber,
  accountESDSBalance: BigNumber,
  totalESDSSupply: BigNumber,
  accountStagedBalance: BigNumber,
  accountBondedBalance: BigNumber,
  accountStatus: number,
  unlocked: number,
};

const STATUS_MAP = ["Unlocked", "Locked", "Locked"];

function status(accountStatus, unlocked) {
  return STATUS_MAP[accountStatus] + (accountStatus === 0 ? "" : " until " + unlocked)
}

const AccountPageHeader = ({
  accountESDBalance, accountESDSBalance, totalESDSSupply, accountStagedBalance, accountBondedBalance, accountStatus, unlocked
}: AccountPageHeaderProps) => (
  <div style={{ padding: '1% 2% 2% 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
    <div style={{ flexBasis: '15%' }} className={styles.box}>
      <BalanceBlock asset="Balance" balance={accountESDBalance} suffix={" DEOX"}/>
    </div>
    <div style={{ flexBasis: '15%' }} className={styles.box}>
      <BalanceBlock asset="Staged" balance={accountStagedBalance}  suffix={" DEOX"}/>
    </div>
    <div style={{ flexBasis: '15%' }} className={styles.box}>
      <BalanceBlock asset="Bonded" balance={accountBondedBalance} suffix={" DEOX"} />
    </div>
  </div>
);


export default AccountPageHeader;
