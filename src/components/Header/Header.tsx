import React from 'react';

import ConnectButton from '../NavBar/ConnectButton';
import { ReactComponent as DeusLogo } from '../../assets/DEUS Logo V1.0.svg';
import { ReactComponent as DownIcon } from '../../assets/Down_Icon.svg';
import styles from './Header.module.scss';


type HeaderProps = {
  hasWeb3: boolean;
  user: string;
  setUser: Function;
};

export default function Header({ hasWeb3, user, setUser }: HeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <DeusLogo />
        <span className={styles.finance}>finance</span>
        {/* {address ? (
          <div className={styles.accountInfo}>
            <div className={styles.accountInfoText}>
              {address}
            </div>
            <div className={styles.accountInfoRightText}>
              {address.slice(address.length - 2)}
            </div>
          </div>
        ) : null} */}
        <div style={{ marginLeft: 20, width: '20%', textAlign: 'right' }}>
          <ConnectButton hasWeb3={hasWeb3} user={user} setUser={setUser} />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rowItem}>
          <span className={styles.text}>LEARN</span>
          <DownIcon />
        </div>
        <div className={styles.rowItem}>
          <span className={styles.text}>APP</span>
          <DownIcon />
        </div>
      </div>
    </div>
  )
};
