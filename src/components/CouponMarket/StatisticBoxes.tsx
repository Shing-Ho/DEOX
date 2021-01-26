import React from 'react';
import { Box } from '@aragon/ui';

import styles from './StatisticBoxes.module.scss'

export default function StatisticBoxes() {
  return (
    <div className={styles.main}>
      <div className={styles.boxes}>
        <Box className={styles.box} style={{ background: 'linear-gradient(90deg, #DFF4FE 0%, #8EB5FF 100%)', border: '2px solid #1C1C1C' }}>
          <div style={{ width: '100%', fontFamily: 'Edu Monument Grotesk Semi-Mono', fontSize: 12, marginBottom: 15, paddingBottom: 5, color: 'black' }}>
            Period
          </div>
          <div className={styles.mainText}>
            #01<span className={styles.grayText}>/21</span>
          </div>
          <div className={styles.mainText}>
            00:25:53
          </div>
        </Box>
        <Box className={styles.box} style={{ background: '#DFF4FE', marginTop: 0, border: '2px solid #1C1C1C' }}>
          <div style={{ width: '100%', fontFamily: 'Edu Monument Grotesk Semi-Mono', fontSize: 12, marginBottom: 15, paddingBottom: 5, color: 'black' }}>
            Payouts in Period #1
          </div>
          <div className={styles.mainText}>
            0.2943345%
          </div>
          <div className={styles.smallGrayText}>
            $129,000 in total this period
          </div>
        </Box>
        <Box className={styles.box} style={{ background: '#DFF4FE', marginTop: 0, border: '2px solid #1C1C1C' }}>
          <div style={{ width: '100%', fontFamily: 'Edu Monument Grotesk Semi-Mono', fontSize: 12, marginBottom: 15, paddingBottom: 5, color: 'black' }}>
            APY percentage yield in Period #1
          </div>
          <div className={styles.mainText}>
            312%
          </div>
        </Box>
      </div>
      <div className={styles.boxes}>
        <Box className={styles.box} style={{ background: 'linear-gradient(90deg, #DFF4FE 0%, #8EB5FF 100%)', border: '2px solid #1C1C1C' }}>
          <div style={{ width: '100%', fontFamily: 'Edu Monument Grotesk Semi-Mono', fontSize: 12, marginBottom: 15, paddingBottom: 5, color: 'black' }}>
            Moon
          </div>
          <div className={styles.mainText}>
            #01<span className={styles.grayText}>/21</span>
          </div>
          <div className={styles.mainText}>
            00:25:53
          </div>
        </Box>
        <Box className={styles.box} style={{ background: '#DFF4FE', marginTop: 0, border: '2px solid #1C1C1C' }}>
          <div style={{ width: '100%', fontFamily: 'Edu Monument Grotesk Semi-Mono', fontSize: 12, marginBottom: 15, paddingBottom: 5, color: 'black' }}>
            Payouts in Epoch #1
          </div>
          <div className={styles.mainText}>
            0.2943345%
          </div>
        </Box>
        <Box className={styles.box} style={{ background: '#DFF4FE', marginTop: 0, border: '2px solid #1C1C1C' }}>
          <div style={{ width: '100%', fontFamily: 'Edu Monument Grotesk Semi-Mono', fontSize: 12, marginBottom: 15, paddingBottom: 5, color: 'black' }}>
            APY Epoch percentage yield in Period #1
          </div>
          <div className={styles.mainText}>
            312%
          </div>
        </Box>
      </div>
    </div>
  )
}