import React, { useState } from 'react';
import { Box } from '@aragon/ui';

import Button from '../common/Button';
import TextInput from '../common/TextInput';
import TextInputWithButton from '../common/TextInputWithButton';
import styles from './BondClaim.module.scss';

export default function BondClaim() {
  const [deoxAmount, setDeoxAmount] = useState();
  const [dBondsAmount, setDBondsAmount] = useState();
  const [claimDeoxAmount, setClaimDeoxAmount] = useState();
  const [claimDeaAmount, setClaimDeaAmount] = useState();
  const [claimUsdcAmount, setClaimUsdcAmount] = useState();
  return (
    <div className={styles.main}>
      <div className={styles.bondDiv}>
        <Box style={{ background: '#0d0d0d', borderColor: '#1b1b1b', borderWidth: 2 }} className={styles.bondBox}>
          <div className={styles.topHeader}>
            Bonds
          </div>
          <div className={styles.boxMain}>
            <div className={styles.apyText}>
              99.93% APY
            </div>
            <div className={styles.apyDescription}>
              you own 0.12% of the Bond Depot
            </div>
            
            <TextInput placeholder={'Enter DEOX amount'} value={deoxAmount} onChange={e => {
              setDeoxAmount(e.target.value)
            }} />
            <Button label="PURCHASE 0.000 dBOND" disabled className={styles.purchaseButton} />
            
            <div className={styles.priceDescription}>
              1 DEOX = 0.34dBOND
            </div>

            <TextInputWithButton value={dBondsAmount} placeholder="dBonds" onChange={e => setDBondsAmount(e.target.value)} label='REDEEM' />
          </div>
        </Box>
      </div>
      
      <div className={styles.cycleDiv}>
        <Box style={{ background: '#0d0d0d', borderColor: '#1b1b1b', borderWidth: 2 }} className={styles.cycleBox}>
          <div className={styles.topHeader}>
            Claim
          </div>
          <div className={styles.claimTitle}>
            Claim your rewards
          </div>
          <div className={styles.claimDescription}>
            Note: rewards will soon able to claimable in DEA and USDC
          </div>
          <div className={styles.eachInputDiv}>
            <TextInputWithButton wide value={claimDeoxAmount} placeholder="0.000 DEOX" onChange={e => setClaimDeoxAmount(e.target.value)} label='Claim' />
          </div>
          <div className={styles.eachInputDiv}>
            <TextInputWithButton wide value={claimDeaAmount} disabled placeholder="0.000 DEA" onChange={e => setClaimDeaAmount(e.target.value)} label='Claim' />
          </div>
          <div className={styles.eachInputDiv}>
            <TextInputWithButton wide value={claimUsdcAmount} disabled placeholder="0.000 USDC" onChange={e => setClaimUsdcAmount(e.target.value)} label='Claim' />
          </div>
          <div className={styles.bottomDiv}>
            <Button label="Claim All" disabled className={styles.claimAll} />
            <div className={styles.totalText}>~$0.00 in DEOX+DEA+USDC</div>
          </div>
        </Box>
      </div>
    </div>
  )
}