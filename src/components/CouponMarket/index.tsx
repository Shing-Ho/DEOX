import React, { useState, useEffect } from 'react';
import { Header } from '@aragon/ui';
import { useParams } from 'react-router-dom';
import {
  Box
} from '@aragon/ui';

import {
  getCouponPremium,
  getTokenAllowance,
  getTokenBalance,
  getTokenTotalSupply, getTotalCoupons,
  getTotalDebt, getTotalRedeemable,
} from '../../utils/infura';
import {ESD, ESDS} from "../../constants/tokens";
import CouponMarketHeader from "./Header";
import {toTokenUnitsBN} from "../../utils/number";
import BigNumber from "bignumber.js";
import PurchaseCoupons from "./PurchaseCoupons";
import PurchaseHistory from "./PurchaseHistory";
import ModalWarning from "./ModalWarning";
import IconHeader from "../common/IconHeader";
import {getPreference, storePreference} from "../../utils/storage";
import {CheckBox} from "../common";
import DEUSBONDS from '../../assets/DEUSBONDS.png';
import styles from './index.module.scss';
import StatisticBoxes from './StatisticBoxes';

const ONE_COUPON = new BigNumber(10).pow(18);

function CouponMarket({ user }: {user: string}) {
  const { override } = useParams();
  if (override) {
    user = override;
  }

  const storedHideRedeemed = getPreference('hideRedeemedCoupons', '0');

  const [balance, setBalance] = useState(new BigNumber(0));
  const [allowance, setAllowance] = useState(new BigNumber(0));
  const [supply, setSupply] = useState(new BigNumber(0));
  const [coupons, setCoupons] = useState(new BigNumber(0));
  const [redeemable, setRedeemable] = useState(new BigNumber(0));
  const [couponPremium, setCouponPremium] = useState(new BigNumber(0));
  const [debt, setDebt] = useState(new BigNumber(0));
  const [hideRedeemed, setHideRedeemed] = useState(storedHideRedeemed === '1');

  useEffect(() => {
    if (user === '') {
      setBalance(new BigNumber(0));
      setAllowance(new BigNumber(0));
      return;
    }
    let isCancelled = false;

    async function updateUserInfo() {
      const [balanceStr, allowanceStr] = await Promise.all([
        getTokenBalance(ESD.addr, user),
        getTokenAllowance(ESD.addr, user, ESDS.addr),
      ]);

      const userBalance = toTokenUnitsBN(balanceStr, ESD.decimals);

      if (!isCancelled) {
        setBalance(new BigNumber(userBalance));
        setAllowance(new BigNumber(allowanceStr));
        (new BigNumber(allowanceStr));
      }
    }
    updateUserInfo();
    const id = setInterval(updateUserInfo, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      const [supplyStr, debtStr, couponsStr, redeemableStr] = await Promise.all([
        getTokenTotalSupply(ESD.addr),
        getTotalDebt(ESDS.addr),
        getTotalCoupons(ESDS.addr),
        getTotalRedeemable(ESDS.addr),
      ]);

      const totalSupply = toTokenUnitsBN(supplyStr, ESD.decimals);
      const totalDebt = toTokenUnitsBN(debtStr, ESD.decimals);
      const totalCoupons = toTokenUnitsBN(couponsStr, ESD.decimals);
      const totalRedeemable = toTokenUnitsBN(redeemableStr, ESD.decimals);

      if (!isCancelled) {
        setSupply(new BigNumber(totalSupply));
        setDebt(new BigNumber(totalDebt));
        setCoupons(new BigNumber(totalCoupons));
        setRedeemable(new BigNumber(totalRedeemable));

        if (totalDebt.isGreaterThan(new BigNumber(1))) {
          const couponPremiumStr = await getCouponPremium(ESDS.addr, ONE_COUPON)
          setCouponPremium(toTokenUnitsBN(couponPremiumStr, ESD.decimals));
        } else {
          setCouponPremium(new BigNumber(0));
        }
      }
    }
    updateUserInfo();
    const id = setInterval(updateUserInfo, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  return (
    <>
      <ModalWarning/>

      <IconHeader icon={<img src={DEUSBONDS} />} text="DEUS BONDS"/>
      <Box style={{ background: '#0d0d0d', borderColor: '#1b1b1b'}} className={styles.cycleBox}>
        <div style={{ width: '100%', fontFamily: 'Edu Monument Grotesk Semi-Mono', fontSize: 12, marginBottom: 15, paddingBottom: 5 }}>
          Cycle
        </div>
        <div>
          Every time DEOX drops under $1 a new cycle starts.
        </div>
        <div>
          A cycle ends if DEOX is over $1 or after 21*21 moons
        </div>
      </Box>
      <div className={styles.twoBox}>
        <Box style={{ background: '#0d0d0d', borderColor: '#1b1b1b'}} className={styles.eachBox}>
          <div className={styles.titleText}>
            Total insurance for this Cycle
          </div>
          <div className={styles.titleText}>
            (DEOX, DEA, USDC)
          </div>
          <div className={styles.mainText}>
            $23, 432.343
          </div>
        </Box>
        <Box style={{ background: '#0d0d0d', borderColor: '#1b1b1b', marginTop: 0 }} className={styles.eachBox}>
          <div className={styles.titleText}>
            Jackpot for this Cycle
          </div>
          <div className={styles.titleText}>
            (DEOX, DEA, USDC)
          </div>
          <div className={styles.mainText}>
            $23, 432.343
          </div>
        </Box>
      </div>

      <StatisticBoxes />

      <Header primary="" />

      <PurchaseCoupons
        user={user}
        allowance={allowance}
        balance={balance}
        debt={debt}
      />

      <div style={{ display: 'flex' }}>
        <Header primary="Coupons" />
        <div style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
          <CheckBox
            text="Hide Redeemed"
            onCheck={(checked) => {
              storePreference('hideRedeemedCoupons', checked ? '1' : '0');
              setHideRedeemed(checked);
            }}
            checked={hideRedeemed}
          />
        </div>
      </div>

      <PurchaseHistory
        user={user}
        hideRedeemed={hideRedeemed}
        totalRedeemable={redeemable}
      />
    </>
  );
}

export default CouponMarket;
