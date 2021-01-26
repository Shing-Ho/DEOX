import React, {useState, useEffect} from 'react';
import { Box, Button, TextInput } from '@aragon/ui';
import BigNumber from 'bignumber.js';

import {
  getTokenBalance,
  getMethodsOfDEADEOX,
  getDeaDeoxPrice,
  sellDeaToDeox,
} from '../../utils/infura';
import { toTokenUnitsBN } from '../../utils/number';
import {DEA, DEOX} from "../../constants/tokens";

import styles from './Warp.module.scss';
import WarpLayer from '../../assets/WarpLayer.png';
import deaImg from '../../assets/DEALogo.png';
import deoxImg from '../../assets/DEOXLogo.png';
import refreshIcon from '../../assets/refresh.png';

function Warp({ user }: {user: string}) {
  const [activeSlippage, setActiveSlippage] = useState('0');
  const [userDeaAmount, setUserDeaAmount] = useState(new BigNumber(0));
  const [userDeaBalance, setUserDeaBalance] = useState(new BigNumber(0));
  const [userDeoxAmount, setUserDeoxAmount] = useState(new BigNumber(0));
  const [userDeoxBalance, setUserDeoxBalance] = useState(new BigNumber(0));
  const [deaDeoxPrice, setDeaDeoxPrice] = useState(new BigNumber(0));

  useEffect(() => {
    async function updateUserInfo() {
      const [deaAmount, deosAmount, contracts, price] = await Promise.all([
        getTokenBalance(DEA.addr, user),
        getTokenBalance(DEOX.addr, user),
        getMethodsOfDEADEOX(),
        getDeaDeoxPrice()
      ]);
      setUserDeaBalance(new BigNumber(toTokenUnitsBN(deaAmount, DEA.decimals)))
      setUserDeoxBalance(new BigNumber(toTokenUnitsBN(deosAmount, DEA.decimals)))
      setDeaDeoxPrice(new BigNumber(toTokenUnitsBN(price, DEA.decimals)));
      console.log('deaAmount', deaAmount)
      console.log('deosAmount', deosAmount)
      console.log('contracts', contracts, new BigNumber(toTokenUnitsBN(price, DEA.decimals)).toNumber())
    }
    updateUserInfo();
  }, [user]);

  useEffect(() => {
    if(userDeaAmount) {
      setUserDeoxAmount(new BigNumber(userDeaAmount).multipliedBy(deaDeoxPrice));
    }
  }, [userDeaAmount])

  const onWarp = async () => {
    const resp = await sellDeaToDeox(userDeoxAmount, userDeaAmount);
    console.log('resp', resp);
  }

  return (
    <div className={styles.main}>
      <div className={styles.deaTitle}>DEA-DEOX WORMHOLE</div>
      <div className={styles.deaDescription}>
        DEA–DEOX wormhole is created to bootstrap DEOX liqidity.
      </div>
      <div className={styles.deaDescription}>
        Warp DEA into DEOX on a reverse bonding curve.
      </div>
      <div className={styles.deaDescription}>
        DEA will be forever lost in the wormhole to cevrease its total supply
      </div>
      <div className={styles.lostNumber}>
        2,345.345 DEA lost
      </div>
      <div className={styles.mainPart}>
        <img src={WarpLayer} />
        <div className={styles.topPart}>
          <Box className={styles.deaTop}>
            <div className={styles.deaTopDiv}>
              <span className={styles.deaTopDivText}>from</span>
              <span className={styles.deaTopDivText}>Balance: {userDeaBalance.toNumber().toFixed(5)}</span>
            </div>
            <div className={styles.deaBottomDiv}>
              {/* <span className={styles.deaBottomDivText}>23.343</span> */}
              <TextInput className={styles.userDeaInput} placeholder={'0.00'} value={userDeaAmount} onChange={e => {
                setUserDeaAmount(e.target.value)
              }} />
              <div className={styles.deaBottomDivRow}>
                <Button className={styles.maxButton} onClick={() => setUserDeaAmount(userDeaBalance)}>
                  MAX
                </Button>
                <img src={deaImg} />
                <span className={styles.deaBottomDivText}>DEA</span>
              </div>
            </div>
          </Box>
        </div>
        <div className={styles.exchangePart}>
          <div className={styles.bottomPart}>
            <Box className={styles.deox}>
              <div className={styles.deoxTop}>
                <span className={styles.deoxTopText}>to</span>
                <span className={styles.deoxTopText}>Balance: {userDeoxBalance.toNumber().toFixed(5)}</span>
              </div>
              <div className={styles.deoxBottom}>
                <span className={styles.deoxBottomText}>{userDeoxAmount.toNumber().toFixed(5)}</span>
                <div className={styles.deoxBottomRow}>
                  <img src={deoxImg} />
                  <span className={styles.deoxBottomText}>DEOX</span>
                </div>
              </div>
            </Box>
            <Box className={styles.dea}>
              <div className={styles.deaRowBetween}>
                <div className={styles.deaText}>
                  Price
                </div>
                <div className={styles.deaRow}>
                  <div className={styles.deaText}>
                    {deaDeoxPrice.toNumber().toFixed(5)} DEOX per DEA
                  </div>
                  <img src={refreshIcon} />
                </div>
              </div>
              <div className={styles.deaRowBetween}>
                <div className={styles.deaText}>
                  Price Impact
                </div>
                <div className={styles.deaRedText}>
                  +13%
                </div>
              </div>
              <div className={styles.deaRowBetween}>
                <div className={styles.deaText}>
                  Trading Volume
                </div>
                <div className={styles.deaText}>
                  945.343 ETH
                </div>
              </div>
              <div className={styles.deaBottomRow}>
                <div className={styles.deaBigText}>
                  Slippage Tolerance
                </div>
                <div className={styles.deaButtons}>
                  <Button className={activeSlippage === '0.1' ? styles.activeButton : styles.deaInactiveButton} onClick={() => setActiveSlippage('0.1')}>
                    <span>0.1%</span>
                  </Button>
                  <Button className={activeSlippage === '0.5' ? styles.activeButton : styles.deaInactiveButton} onClick={() => setActiveSlippage('0.5')}>
                    <span>0.5%</span>
                  </Button>
                  <Button className={activeSlippage === '1' ? styles.activeButton : styles.deaInactiveButton} onClick={() => setActiveSlippage('1')}>
                    <span>1%</span>
                  </Button>
                  <div className={styles.deaInputWrapper}>
                    <TextInput className={styles.deaTextInput} placeholder={'0.50'} value={activeSlippage} onChange={e => {
                      setActiveSlippage(e.target.value)
                    }} />
                    <span className={styles.percent}>%</span>
                  </div>
                </div>
              </div>
            </Box>
            {userDeaAmount && new BigNumber(userDeaAmount).toNumber() !== 0 ? (
              <Button wide className={styles.warpButton} onClick={() => onWarp()}>WARP</Button>
            ) : (
              <Button wide className={styles.inactiveWarpButton} disabled>Enter Amount</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Warp;